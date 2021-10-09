import { BasicColumn } from '/@/components/Table/src/types/table';
import { ref } from 'vue';

export const tableSetting = {
  title: '签约客户',
  titleHelpMessage: '来游吧',
};

export const isFilterDropdown = ref(false);
const onFilterDropdownVisibleChange = (visible: boolean) => {
  isFilterDropdown.value = visible;
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '来游吧ID',
      dataIndex: 'clientId',
      width: 150,
      sorter: true,
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '客户类型',
      dataIndex: 'type',
      width: 100,
      filters: [{ text: '加载中', value: '' }],
      slots: { filterIcon: 'filterIcon', customRender: 'Text' },
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      width: 250,
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '销售额',
      helpMessage: '本年累计/万元',
      dataIndex: 'sales',
      width: 150,
      sorter: true,
      defaultSortOrder: 'descend',
      format: (value) => {
        return ((Number(value) / 10000).toFixed(2) + '').replace(
          /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
          '$&,',
        );
      },
    },
    {
      title: '签约主体',
      dataIndex: 'companyName',
      width: 250,
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'uniformSocialCreditCode',
      width: 200,
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '客户拓展负责人',
      dataIndex: 'manager',
      width: 150,
      filters: [{ text: '加载中', value: '' }],
      slots: { filterIcon: 'filterIcon', customRender: 'Text' },
    },
    {
      title: '合约起始时间',
      width: 150,
      sorter: true,
      format: 'date|YYYY-MM-DD',
      dataIndex: 'cooperateStartTime',
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },

    {
      title: '合约到期时间',
      width: 150,
      sorter: true,
      format: 'date|YYYY-MM-DD',
      dataIndex: 'cooperateEndTime',
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '客户地址',
      width: 300,
      dataIndex: 'address',
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
    {
      title: '联系方式',
      width: 200,
      dataIndex: 'mobile',
      slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
      onFilterDropdownVisibleChange,
    },
  ];
}
