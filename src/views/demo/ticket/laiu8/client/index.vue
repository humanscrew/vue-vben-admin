<template>
  <div class="p-4">
    <BasicTable
      bordered
      showTableSetting
      expandRowByClick
      :columns="tableColumns"
      :title="tableSetting.title"
      :titleHelpMessage="tableSetting.titleHelpMessage"
      :canResize="canResize"
      @columns-change="handleColumnChange"
      @register="register"
    >
      <template #toolbar>
        <Tooltip
          :title="!canResize ? '自适应高度' : '取消自适应'"
          placement="bottom"
          :mouseEnterDelay="0.5"
          @click="toggleCanResize"
        >
          <Icon :icon="canResize ? 'bi:arrows-expand' : 'bi:arrows-collapse'" />
        </Tooltip>
      </template>

      <template #searchIcon>
        <Icon ref="searchIconRef" icon="uil:search" class="mt-4" />
      </template>
      <template #searchDropdown="{ setSelectedKeys, confirm, clearFilters, column }">
        <div class="p-2 flex flex-wrap justify-left w-70">
          <a-button
            type="primary"
            class="mb-2 mr-4"
            preIcon="uil:search"
            size="small"
            @click="handleConfirm(confirm)"
          >
            查找
          </a-button>
          <a-button class="mb-2" size="small" @click="handleReset(clearFilters)">重置</a-button>
          <!-- <Tooltip :title="selectedKeys" placement="top"> -->
          <Select
            ref="selectRef"
            class="w-70"
            mode="multiple"
            labelInValue
            :value="searchValue"
            :token-separators="[',']"
            :placeholder="`${column.dataIndex}`"
            :filter-option="false"
            :options="selectOptions"
            @search="(value) => handleSearch(value, column.dataIndex)"
            @change="(value) => handleChange(value, setSelectedKeys)"
          >
            <template #notFoundContent>
              <div v-if="fetching" class="text-center">
                <Spin size="small" />
              </div>
              <div v-else class="text-center">
                <Icon icon="fluent:delete-24-regular" />
              </div>
            </template>
          </Select>
          <!-- </Tooltip> -->
        </div>
      </template>

      <template #filterIcon="{ column }">
        <Icon
          ref="filterIconRef"
          icon="mdi:filter-menu"
          class="mt-4"
          @click="handleFilter(column.dataIndex)"
        />
      </template>

      <template #Lock="{ record }">
        <Icon
          v-if="record"
          :icon="record.isLock ? 'mdi:lock-outline' : 'clarity:unknown-status-line'"
          :color="record.isLock ? '' : 'red'"
        />
      </template>
      <template #Tag="{ text }">
        <Tag @click="handleCopy(text)" :color="tagColor(text)">
          {{ text }}
        </Tag>
      </template>
      <template #Text="{ text }">
        <div @click="handleCopy(text)" class="text-sm truncate">
          {{ text }}
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, watch, nextTick } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { Tooltip, Tag, Select, Spin } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { tableSetting, getBasicColumns, isFilterDropdown } from './components/tableData';
  import { getLaiu8ClientAPI } from '/@/api/sys/ticket';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { debounce } from 'lodash-es';
  import { isNullOrUnDef } from '/@/utils/is';

  const [register] = useTable({
    api: getLaiu8ClientAPI,
  });

  let tableColumns = ref(getBasicColumns());

  const canResize = ref(true);

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  function handleColumnChange(data: ColumnChangeParam[]) {
    data;
  }

  const { createMessage } = useMessage();
  const { clipboardRef, copiedRef } = useCopyToClipboard();
  const handleCopy = (value) => {
    if (!value) {
      createMessage.warning('空值复制无效');
      return;
    }
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      createMessage.warning('已复制');
      return;
    }
    createMessage.error('复制失败');
  };

  const searchIconRef = ref();
  const selectOptions = ref([]);
  const searchValue = ref();

  let lastFetchId = 0;
  const fetching = ref(false);
  const handleFetch = async (value, dataIndex) => {
    lastFetchId++;
    const fetchId = lastFetchId;
    fetching.value = true;
    selectOptions.value = [];
    const { result } = await getLaiu8ClientAPI({
      page: 1,
      per_page: 100,
      filterLike: [{ field: dataIndex, values: [value] }],
      withEntities: [dataIndex],
      distinct: true,
    });
    if (fetchId !== lastFetchId) {
      // for fetch callback order
      return;
    }
    for (let index = 0; index < result.length; index++) {
      const value = result[index][dataIndex];
      if (!isNullOrUnDef(value)) {
        selectOptions.value.push({ value: value, key: index });
      }
    }
    fetching.value = false;
  };
  const handleSearch = debounce(handleFetch, 300);

  const selectRef = ref();
  watch(
    isFilterDropdown,
    async () => {
      if (isFilterDropdown.value) {
        await nextTick(async () => {
          selectRef.value.focus();
          fetching.value = true;
          await selectRef.value.$.props.onSearch();
        });
      }
    },
    {
      immediate: true,
    },
  );

  const handleChange = (value, setSelectedKeys) => {
    const selectedKeys = value.map((item) => {
      return item.value;
    });
    setSelectedKeys(selectedKeys);
  };

  const handleConfirm = (confirm) => {
    confirm();
    searchIconRef.value.$.props.color = '#108ee9';
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    selectOptions.value = [];
    searchValue.value = [];
    searchIconRef.value.$.props.color = undefined;
  };

  const handleFilter = async (dataIndex) => {
    for (let index = 0; index < tableColumns.value.length; index++) {
      const column = tableColumns.value[index];
      if (
        column.dataIndex === dataIndex &&
        (column.filters?.length > 1 || column.filters[0].value)
      ) {
        return;
      }
    }

    const { result } = await getLaiu8ClientAPI({
      page: 1,
      per_page: 100,
      withEntities: [dataIndex],
      distinct: true,
    });
    let filters = [];
    for (let index = 0; index < result.length; index++) {
      const value = result[index][dataIndex];
      if (!isNullOrUnDef(value)) {
        filters.push({ text: value, value: value });
      }
    }

    for (let index = 0; index < tableColumns.value.length; index++) {
      const column = tableColumns.value[index];
      if (column.dataIndex == dataIndex) {
        tableColumns.value[index].filters = filters;
        break;
      }
    }
  };
</script>
