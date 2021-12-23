<template>
  <DropdownButton
    placement="bottomCenter"
    @click="handleButtonClick"
    :getPopupContainer="getPopupContainer"
    size="small"
  >
    导出
    <template #overlay>
      <Menu @click="handleMenuClick" selectable v-model:selectedKeys="selectedKeys">
        <MenuItem v-for="item in dropdownOptions" :key="item.key">
          <span>{{ item.label }}</span>
        </MenuItem>
      </Menu>
    </template>
  </DropdownButton>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { DropdownButton, Menu } from 'ant-design-vue';
  import { getPopupContainer } from '/@/utils';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { useTableContext } from '/@/components/Table/src/hooks/useTableContext';
  import { isArray, isNullOrUnDef } from '/@/utils/is';
  import { formatToDateTime } from '/@/utils/dateUtil';

  const MenuItem = Menu.Item;

  const dropdownOptions = reactive([
    {
      label: 'xlsx',
      value: 'xlsx',
      key: 'xlsx',
    },
    {
      label: 'html',
      value: 'html',
      key: 'html',
    },
    {
      label: 'csv',
      value: 'csv',
      key: 'csv',
    },
    {
      label: 'txt',
      value: 'txt',
      key: 'txt',
    },
  ]);

  const selectedKeys = ref([dropdownOptions[0].key]);
  const handleMenuClick = ({ key }) => {
    selectedKeys.value = [key];
  };

  const table = useTableContext();
  const handleButtonClick = () => {
    const bookType = selectedKeys.value[0];
    const dateTime = '@' + formatToDateTime(new Date().getTime());
    const filename = table.getBindValues.value.title().props.title + dateTime + '.' + bookType;

    const columns = table.getColumns();
    const { result: records } = table.getRawDataSource();
    const len = records.length;
    const data = new Array(len).fill(0).map(() => ({}));
    const header = {};

    for (let i = 0; i < columns.length; i++) {
      let dataIndex = columns[i].dataIndex;
      let title = columns[i].title;
      if (isNullOrUnDef(dataIndex)) {
        continue;
      }

      let headerKey = undefined;
      records.forEach((item, index) => {
        if (!isArray(dataIndex)) {
          dataIndex = [dataIndex];
        }

        headerKey = dataIndex.join('.');
        dataIndex.forEach((key) => {
          item = item[key];
        });

        data[index][headerKey] = item;
      });

      header[headerKey] = title ?? dataIndex;
    }

    jsonToSheetXlsx({
      data,
      filename,
      header,
      write2excelOpts: {
        bookType,
      },
    });
  };
</script>
