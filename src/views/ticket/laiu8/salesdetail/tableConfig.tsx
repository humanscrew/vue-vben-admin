import { BasicColumn } from '/@/components/Table/src/types/table';

enum ColorEnum {
  '来游吧' = 'blue',
  '已退款' = 'red',
  '一检' = 'green',
  '二检' = 'green',
  '出票成功' = 'green',
  '改签废票' = 'orange',
  '微信' = '#87d068',
  '支付宝' = '#2db7f5',
}

const SearchDropdown = ['filterDropdown', { function: 'useSearchDropdown', params: [] }] as any;
const SearchIcon = ['filterIcon', 'SearchIcon'];
const FilterIcon = ['filterIcon', 'FilterIcon'];
const Text = ['columnRender', 'Text'] as any;
const Lock = ['columnRender', 'Lock'] as any;
const Tag = ['columnRender', { function: 'useTag', params: [ColorEnum] }];

const tableSetting = {
  title: '销售明细',
  titleHelpMessage: '双击单元格内容即可复制',
  hideStatus: '已取消',
  api: ['getTicketLaiu8API'],
};

const columns: BasicColumn[] = [
  {
    title: '锁定',
    dataIndex: 'isLock',
    width: 80,
    filters: [
      { text: '已锁定', value: '1' },
      { text: '待确认', value: '0' },
    ],
    filterIcon: FilterIcon,
    customRender: Lock,
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
    sorter: true,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
  {
    title: '订单ID',
    dataIndex: 'orderId',
    width: 180,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
    width: 200,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '渠道',
    dataIndex: 'channelName',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '票号',
    dataIndex: 'ticketNo',
    width: 100,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '售检票状态',
    dataIndex: 'ticketStatus',
    width: 120,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Tag,
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    width: 150,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Tag,
  },
  {
    title: '客户ID',
    dataIndex: 'userId',
    width: 100,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
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
    width: 250,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '客户联系方式',
    dataIndex: 'mobile',
    width: 150,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '支付时间',
    dataIndex: 'paymentTime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
    sorter: true,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
  {
    title: '支付ID',
    dataIndex: 'payId',
    width: 250,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '原价',
    dataIndex: 'fullTicketPrice',
    width: 100,
  },
  {
    title: '票价折扣',
    dataIndex: 'discountPrice',
    width: 100,
  },
  {
    title: '实际票价',
    dataIndex: 'ticketPrice',
    width: 100,
  },
  {
    title: '产生的积分',
    dataIndex: 'getVoucher',
    width: 150,
  },
  {
    title: '使用的积分',
    dataIndex: 'useVoucher',
    width: 150,
  },
  {
    title: '实际支付价格',
    dataIndex: 'realPrice',
    width: 150,
  },
  {
    title: '状态变更',
    dataIndex: 'changeType',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 100,
  },
  {
    title: '票型',
    dataIndex: 'ticketTypeName',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
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
    title: '航班时间',
    dataIndex: 'departureDatetime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
    sorter: true,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
  {
    title: '航线名称',
    dataIndex: 'lineName',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '船舶名称',
    dataIndex: 'shipName',
    width: 100,
    filters: [],
    filterIcon: FilterIcon,
    customRender: Text,
  },
  {
    title: '船舱名称',
    dataIndex: 'cabinName',
    width: 100,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '座位号',
    dataIndex: 'seatMemo',
    width: 100,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '乘客姓名',
    dataIndex: 'passengerName',
    width: 100,
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
    customRender: Text,
  },
  {
    title: '乘客身份证号',
    dataIndex: 'passengerIdNo',
    width: 200,
    format: (value: string): string => {
      return value && value.replace(/^(.{4})(?:\w+)(.{4})$/, '$1****$2');
    },
    filterIcon: SearchIcon,
    filterDropdown: SearchDropdown,
  },
];

const innerColumns: BasicColumn[] = [
  {
    title: '状态变更',
    dataIndex: 'changeType',
    width: 100,
    customRender: Text,
  },
  {
    title: '实际支付价格',
    dataIndex: 'realPrice',
    width: 150,
    customRender: Text,
  },
  {
    title: '退款金额',
    dataIndex: 'refundAmount',
    width: 100,
    customRender: Text,
  },
  {
    title: '手续费',
    dataIndex: 'fee',
    width: 100,
    customRender: Text,
  },
  {
    title: '支付时间',
    dataIndex: 'paymentTime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    width: 150,
    customRender: Text,
  },
  {
    title: '支付ID',
    dataIndex: 'payId',
    width: 250,
    customRender: Text,
  },
  {
    title: '变更后关联票号',
    dataIndex: 'ticketNoNew',
    width: 150,
    customRender: Text,
  },
  {
    title: '变更时间',
    dataIndex: 'changeTime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
  {
    title: '变更渠道',
    dataIndex: 'ticketChangeChannelName',
    width: 100,
    customRender: Text,
  },
  {
    title: '变更操作人',
    dataIndex: 'changeUserName',
    width: 100,
    customRender: Text,
  },
  {
    title: '退款方式',
    dataIndex: 'ticketRefundMethod',
    width: 100,
    customRender: Text,
  },
  {
    title: '实际退款时间',
    dataIndex: 'ticketRefundFinishTime',
    width: 150,
    format: 'date|YYYY-MM-DD HH:mm:ss',
  },
  {
    title: '退款ID',
    dataIndex: 'refundId',
    width: 250,
    customRender: Text,
  },
  {
    title: '',
    dataIndex: '',
  },
];

export const tableConfig = {
  ...tableSetting,
  columns,
  innerColumns,
};
