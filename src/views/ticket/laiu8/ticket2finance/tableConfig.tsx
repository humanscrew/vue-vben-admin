import { BasicColumn } from '/@/components/Table/src/types/table';
import { getTicket2FinanceAPI } from '/@/api/ticket/ticket';
import { tableConfig as clientTableConfig } from '/@/views/ticket/laiu8/client/tableConfig';

const SearchDropdown = ['filterDropdown', { function: 'useSearchDropdown', params: [] }] as any;
const SearchIcon = ['filterIcon', 'SearchIcon'];
const FilterIcon = ['filterIcon', 'FilterIcon'];
const Text = ['columnRender', 'Text'] as any;

const columns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 150,
    sorter: true,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '日期',
    dataIndex: 'date',
    format: 'date|YYYY-MM-DD',
    sorter: true,
    width: 150,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '客户类型',
    dataIndex: 'userType',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '客户名称',
    dataIndex: 'userName',
    width: 300,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '实际金额',
    dataIndex: 'ticketPrice',
    width: 150,
  },
  {
    title: '产生积分',
    dataIndex: 'getVoucher',
    width: 150,
  },
  {
    title: '使用积分',
    dataIndex: 'useVoucher',
    width: 150,
  },
];

const config = {
  title: '业财数据',
  titleHelpMessage: '制证数据提取',
  api: getTicket2FinanceAPI,
  columns,
};

export const tableConfig = [config, clientTableConfig];
