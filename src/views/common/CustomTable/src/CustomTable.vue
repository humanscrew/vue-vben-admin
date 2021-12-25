<template>
  <div class="p-4">
    <BasicTable
      bordered
      showTableSetting
      expandRowByClick
      :indentSize="10"
      :columns="tableColumns"
      :title="tableSetting.title"
      :titleHelpMessage="tableSetting.titleHelpMessage"
      :canResize="canResize"
      @resize-column="handleResizeColumn"
      @register="register"
    >
      <template #tableTitle v-if="isMultiTable">
        <TableTitle :tableConfig="tableConfig" :tableIndex="tableIndex" />
      </template>

      <template #toolbar>
        <ExportDropdown />
        <Tooltip
          :title="!canResize ? '自适应高度' : '取消自适应'"
          placement="bottom"
          :mouseEnterDelay="0.5"
          @click="toggleCanResize"
        >
          <Icon :icon="canResize ? 'bi:arrows-expand' : 'bi:arrows-collapse'" />
        </Tooltip>
      </template>

      <template #expandedRowRender="{ record }" v-if="innerColumns.length">
        <BasicTable
          v-if="record.ticketStatus != tableSetting.hideStatus"
          :dataSource="[record]"
          :columns="innerColumns"
          :pagination="false"
          :canResize="false"
          :inset="false"
          bordered
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { isEmpty, isArray } from '/@/utils/is';
  import ExportDropdown from './components/ExportDropdown.vue';
  import TableTitle from './components/TableTitle.vue';

  const props = defineProps({
    tableConfig: Object,
  });

  const { tableConfig } = unref(props);

  const isMultiTable = isArray(tableConfig);
  const tableIndex = ref(0);
  const config = isMultiTable ? tableConfig[tableIndex.value] : tableConfig;
  const { tableSetting, basicColumns, innerColumns = [] } = config;

  const tableColumns = ref(basicColumns);

  const [register] = useTable({
    api: tableSetting.api,
  });

  const canResize = ref(true);

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  const handleResizeColumn = (w, col) => {
    col.width = w;
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
