<template>
  <div class="p-4">
    <BasicTable
      bordered
      showTableSetting
      expandRowByClick
      :canResize="canResize"
      @resize-column="handleResizeColumn"
      @register="register"
    >
      <template #tableTitle v-if="isMultiTable">
        <TableSelector
          :tableConfig="tableConfig"
          :tableIndex="tableIndex"
          @change="handleTableSelect"
        />
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

      <template #expandedRowRender="{ record }" v-if="config.innerColumns?.length">
        <BasicTable
          v-if="record.ticketStatus != config.hideStatus"
          :dataSource="[record]"
          :columns="config.innerColumns"
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
  import { isEmpty, isArray, isString } from '/@/utils/is';
  import ExportDropdown from './components/ExportDropdown.vue';
  import TableSelector from './components/TableSelector.vue';
  import { CustomRender } from './components/CustomRender';
  import { tableApi } from './tableApi';

  const props = defineProps({
    tableConfig: Object,
  });

  const { tableConfig } = unref(props);
  const isMultiTable = isArray(tableConfig);
  const tableIndex = ref(0);

  const handleApi = (config) => {
    if (isArray(config.api)) {
      let api = tableApi;
      config.api.forEach((item) => {
        api = api[item];
      });
      config.api = api;
    }
  };

  const getConfig = () => {
    const config = isMultiTable ? tableConfig[tableIndex.value] : tableConfig;
    handleApi(config);
    return {
      indentSize: 10,
      ...config,
    };
  };

  const config = ref(getConfig());

  const [register, { setTableData, setProps, reload }] = useTable(config.value);

  const canResize = ref(true);

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  const handleResizeColumn = (w, col) => {
    col.width = w;
  };

  const handleColumnFilter = () => {
    const columns = config.value.columns;
    const api = config.value.api;
    columns.forEach(async (column, index) => {
      let filters = column.filters;
      if (!isEmpty(filters)) {
        return;
      }
      const dataIndex = column.dataIndex;
      const { result } = await api({
        // page: 1,
        // per_page: 50,
        withEntities: [dataIndex],
        distinct: true,
      });
      result.forEach((item) => {
        item[dataIndex] && filters.push({ text: item[dataIndex], value: item[dataIndex] });
      });
      columns[index].filters = filters;
    });
  };

  const getRender = (arg) => {
    if (isArray(arg)) {
      let render = CustomRender;
      arg.forEach((item) => {
        render = isString(item) ? render[item] : render[item.function](...item.params);
      });
      return render;
    } else {
      return arg;
    }
  };

  const handleCustomRender = () => {
    const columns = config.value.columns;
    columns.forEach((column) => {
      column.filterIcon = getRender(column.filterIcon);
      column.filterDropdown = getRender(column.filterDropdown);
      column.customRender = getRender(column.customRender);
    });
  };

  const handleColumn = () => {
    handleColumnFilter();
    handleCustomRender();
  };

  const handleTableSelect = (key) => {
    if (key == tableIndex.value) {
      return;
    }
    tableIndex.value = key;
    config.value = getConfig();
    setTableData([]);
    setProps(config.value);
    reload();
    handleColumn();
  };

  onMounted(() => {
    handleColumn();
  });
</script>
