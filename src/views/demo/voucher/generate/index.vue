<template>
  <div class="p-4">
    <BasicTable
      title="签约客户"
      titleHelpMessage="来游吧"
      bordered
      :canResize="canResize"
      :rowSelection="{ type: 'checkbox' }"
      showTableSetting
      :fetchSetting="fetchSetting"
      :filterFn="filterFn"
      :sortFn="sortFn"
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
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { getBasicColumns } from './tableData';
  import { Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { getLaiu8ClientAPI } from '/@/api/sys/ticket';
  import type { SorterResult } from '/@/components/Table';
  import { OrderEnum } from '/@/enums/orderEnum';

  const [register] = useTable({
    api: getLaiu8ClientAPI,
    columns: getBasicColumns(),
  });

  const fetchSetting = {
    pageField: 'page',
    sizeField: 'per_page',
    listField: 'results',
    totalField: 'total',
  };

  const canResize = ref(true);

  const filterFn = (filters) => {
    return filters;
  };

  const sortFn = (sortInfo: SorterResult) => {
    const { field, order } = sortInfo;
    const orderType = OrderEnum[order];
    return {
      field,
      order: orderType,
    };
  };

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  function handleColumnChange(data: ColumnChangeParam[]) {
    console.log('ColumnChanged', data);
  }
</script>
