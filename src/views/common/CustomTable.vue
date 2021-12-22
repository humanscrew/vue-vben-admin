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
        <Icon icon="uil:search" />
      </template>
      <template #customFilterDropdown="{ setSelectedKeys, confirm, clearFilters, column }">
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
          <Select
            class="w-70"
            mode="multiple"
            labelInValue
            v-model:value="searchValue"
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
        </div>
      </template>

      <template #filterIcon> <Icon icon="mdi:filter-menu" /> </template>

      <template #Lock="{ record }">
        <Icon
          v-if="record"
          :icon="record.isLock ? 'mdi:lock-outline' : 'clarity:unknown-status-line'"
          :color="record.isLock ? '' : 'red'"
        />
      </template>

      <template #Tag="{ text }">
        <Tooltip :title="text" placement="top" :mouseEnterDelay="0.5">
          <Tag @click="handleCopy(text)" :color="tagColor(text)">
            {{ text }}
          </Tag>
        </Tooltip>
      </template>

      <template #Text="{ text }">
        <Tooltip :title="text" placement="top" :mouseEnterDelay="0.5">
          <div @click="handleCopy(text)" class="text-sm truncate">
            {{ text }}
          </div>
        </Tooltip>
      </template>

      <template #expandedRowRender="{ record }" v-if="innerColumns.length">
        <BasicTable
          v-if="record.ticketStatus != tableSetting.hideStatus"
          :dataSource="[record]"
          :columns="innerColumns"
          :pagination="false"
          :canResize="false"
          inset
          bordered
        >
          <template #Tag="{ text }">
            <Tooltip :title="text" placement="top" :mouseEnterDelay="0.5">
              <Tag @click="handleCopy(text)" :color="tagColor(text)">
                {{ text }}
              </Tag>
            </Tooltip>
          </template>
          <template #Text="{ text }">
            <Tooltip :title="text" placement="top" :mouseEnterDelay="0.5">
              <div @click="handleCopy(text)" class="text-sm truncate">
                {{ text }}
              </div>
            </Tooltip>
          </template>
        </BasicTable>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { Tooltip, Tag, Select, Spin } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { debounce } from 'lodash-es';
  import { isNullOrUnDef, isEmpty } from '/@/utils/is';

  const props = defineProps({
    tableData: Object,
  });

  const { tableSetting, basicColumns, innerColumns = [], ColorEnum = {} } = unref(props.tableData);

  let tableColumns = ref(basicColumns);

  const [register] = useTable({
    api: tableSetting.api,
  });

  const canResize = ref(true);

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  function handleColumnChange(data: ColumnChangeParam[]) {
    data;
  }

  const tagColor = (text) => {
    const color = ColorEnum[text];
    return color;
  };

  const { createMessage } = useMessage();
  const { clipboardRef, copiedRef } = useCopyToClipboard();
  const handleCopy = (value) => {
    if (!value) {
      createMessage.warning('空值复制无效');
      return;
    }
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      createMessage.success('已复制');
      return;
    }
    createMessage.error('复制失败');
  };

  const selectOptions = ref([]);
  const searchValue = ref();

  let lastFetchId = 0;
  const fetching = ref(false);
  const handleFetch = async (value, dataIndex) => {
    lastFetchId++;
    const fetchId = lastFetchId;
    fetching.value = true;
    selectOptions.value = [];
    const { result } = await tableSetting.api({
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

  const handleChange = (value, setSelectedKeys) => {
    const selectedKeys = value.map((item) => {
      return item.value;
    });
    setSelectedKeys(selectedKeys);
  };

  const handleConfirm = (confirm) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    console.log(searchValue.value);
    selectOptions.value = [];
    searchValue.value = [];
  };

  onMounted(() => {
    tableColumns.value.forEach(async (column, index) => {
      let filters = column.filters;
      if (!isEmpty(filters)) {
        return;
      }
      const dataIndex = column.dataIndex;
      const { result } = await tableSetting.api({
        // page: 1,
        // per_page: 50,
        withEntities: [dataIndex],
        distinct: true,
      });
      result.forEach((item) => {
        item[dataIndex] && filters.push({ text: item[dataIndex], value: item[dataIndex] });
      });
      tableColumns.value[index].filters = filters;
    });
  });
</script>
