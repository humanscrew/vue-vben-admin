import { BasicColumn } from '/@/components/Table/src/types/table';
import { getLaiu8ClientAPI } from '/@/api/ticket/ticket';

const SearchDropdown = ['filterDropdown', { function: 'useSearchDropdown', params: [] }] as any;
const SearchIcon = ['filterIcon', 'SearchIcon'];
const FilterIcon = ['filterIcon', 'FilterIcon'];
const Text = ['columnRender', 'Text'] as any;

const columns: BasicColumn[] = [
  {
    title: '来游吧ID',
    dataIndex: 'clientId',
    width: 150,
    sorter: true,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '客户类型',
    dataIndex: 'type',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    width: 250,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '销售额',
    helpMessage: '本年累计/万元',
    dataIndex: 'sales',
    width: 150,
    sorter: true,
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
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'uniformSocialCreditCode',
    width: 200,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '客户拓展负责人',
    dataIndex: 'manager',
    width: 150,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '合约起始时间',
    width: 150,
    sorter: true,
    format: 'date|YYYY-MM-DD',
    dataIndex: 'cooperateStartTime',
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },

  {
    title: '合约到期时间',
    width: 150,
    sorter: true,
    format: 'date|YYYY-MM-DD',
    dataIndex: 'cooperateEndTime',
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
  {
    title: '客户地址',
    width: 300,
    dataIndex: 'address',
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '联系方式',
    width: 200,
    dataIndex: 'mobile',
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
];

export const tableConfig = {
  title: '签约客户',
  titleHelpMessage: '来游吧',
  api: getLaiu8ClientAPI,
  columns,
};
