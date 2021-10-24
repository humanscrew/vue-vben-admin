import { BasicColumn } from '/@/components/Table/src/types/table';
import { getTicket2FinanceAPI } from '/@/api/sys/ticket';

const tableSetting = {
  title: '业财数据',
  titleHelpMessage: '制证数据提取',
  api: getTicket2FinanceAPI,
};

const basicColumns: BasicColumn[] = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 150,
    sorter: true,
    filters: [],
    slots: { filterIcon: 'filterIcon', customRender: 'Text' },
  },
  {
    title: '日期',
    dataIndex: 'date',
    format: 'date|YYYY-MM-DD',
    sorter: true,
    width: 150,
    slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    width: 100,
    filters: [],
    slots: { filterIcon: 'filterIcon', customRender: 'Text' },
  },
  {
    title: '客户类型',
    dataIndex: 'userType',
    width: 100,
    filters: [],
    slots: { filterIcon: 'filterIcon', customRender: 'Text' },
  },
  {
    title: '客户名称',
    dataIndex: 'userName',
    width: 300,
    slots: { filterIcon: 'searchIcon', filterDropdown: 'searchDropdown', customRender: 'Text' },
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    width: 100,
    filters: [],
    slots: { filterIcon: 'filterIcon', customRender: 'Text' },
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

export const tableData = {
  tableSetting,
  basicColumns,
};
