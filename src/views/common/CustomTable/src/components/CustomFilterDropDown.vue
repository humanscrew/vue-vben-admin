<template>
  <div class="p-2 flex flex-wrap justify-left w-70">
    <a-button type="primary" class="mb-2 mr-4" preIcon="uil:search" size="small" @click="confirm()">
      查找
    </a-button>
    <a-button class="mb-2" size="small" @click="handleReset(clearFilters)">重置</a-button>
    <Select
      class="w-70"
      mode="multiple"
      labelInValue
      v-model:value="state.selectValue"
      :token-separators="[',']"
      :placeholder="`${column.dataIndex}`"
      :filter-option="false"
      :options="state.options"
      :maxTagTextLength="15"
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

<script lang="ts" setup>
  import { ref, reactive, toRefs } from 'vue';
  import Icon from '/@/components/Icon';
  import { Select, Spin } from 'ant-design-vue';
  import { isNullOrUnDef } from '/@/utils/is';
  import { debounce } from 'lodash-es';

  const props = defineProps({
    setSelectedKeys: Function,
    confirm: Function,
    clearFilters: Function,
    column: Object,
    api: Function,
  });

  const { setSelectedKeys, confirm, clearFilters, column, api } = toRefs(props);

  const state = reactive({
    selectValue: [],
    options: [] as selectOption[],
  });

  const handleReset = (clearFilters: Function) => {
    state.selectValue = [];
    state.options = [];
    clearFilters();
  };

  let lastFetchId = 0;
  const fetching = ref(false);
  const handleFetch = async (value: string | number, dataIndex: string) => {
    lastFetchId++;
    const fetchId = lastFetchId;
    fetching.value = true;
    state.options = [];
    const { result } = await api.value({
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
        state.options.push({ value: value, label: value, key: index });
      }
    }
    fetching.value = false;
  };
  const handleSearch = debounce(handleFetch, 300);

  const handleChange = (value: selectOption[], setSelectedKeys: Function) => {
    const selectedKeys = value.map((item) => {
      return item.value;
    });
    setSelectedKeys(selectedKeys);
  };
</script>
