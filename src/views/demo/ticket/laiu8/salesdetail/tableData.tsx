import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '锁定',
      dataIndex: 'isLock',
      width: 80,
      filters: [
        { text: '已核销', value: '1' },
        { text: '待确认', value: '0' },
      ],
      slots: { customRender: 'Lock' },
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      width: 150,
      format: 'date|YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '订单ID',
      dataIndex: 'orderId',
      width: 180,
      slots: { customRender: 'Tag' },
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      width: 200,
      slots: { customRender: 'Text' },
    },
    {
      title: '票号',
      dataIndex: 'ticketNo',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '售检票状态',
      dataIndex: 'ticketStatus',
      width: 120,
      filters: [
        { text: '一检', value: '一检' },
        { text: '二检', value: '二检' },
        { text: '出票成功', value: '出票成功' },
        { text: '已取消', value: '已取消' },
        { text: '已退款', value: '已退款' },
        { text: '改签废票', value: '改签废票' },
      ],
      slots: { customRender: 'Tag' },
    },
    {
      title: '渠道',
      dataIndex: 'channelName',
      width: 100,
      filters: [
        { text: '来游吧', value: '来游吧' },
        { text: '北海窗口', value: '北海窗口' },
        { text: '涠洲窗口', value: '涠洲窗口' },
        { text: '票务室', value: '票务室' },
        { text: '驻岛订票', value: '驻岛订票' },
        { text: '内部订票', value: '内部订票' },
      ],
      slots: { customRender: 'Tag' },
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      width: 150,
      filters: [
        { text: '微信', value: '微信' },
        { text: '支付宝', value: '支付宝' },
      ],
      slots: { customRender: 'Tag' },
    },
    {
      title: '客户ID',
      dataIndex: 'userId',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '客户类型',
      dataIndex: 'userType',
      filters: [
        { text: 'OTA', value: 'OTA' },
        { text: 'VIP', value: 'VIP' },
        { text: '散客', value: '散客' },
      ],
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '客户名称',
      dataIndex: 'userName',
      width: 250,
      slots: { customRender: 'Text' },
    },
    {
      title: '客户联系方式',
      dataIndex: 'mobile',
      width: 120,
      slots: { customRender: 'Text' },
    },
    {
      title: '支付时间',
      dataIndex: 'paymentTime',
      width: 150,
      format: 'date|YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '支付ID',
      dataIndex: 'payId',
      width: 250,
      slots: { customRender: 'Text' },
    },
    {
      title: '原价',
      dataIndex: 'fullTicketPrice',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '票价折扣',
      dataIndex: 'discountPrice',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '实际票价',
      dataIndex: 'ticketPrice',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '产生的积分',
      dataIndex: 'getVoucher',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '使用的积分',
      dataIndex: 'useVoucher',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '实际支付价格',
      dataIndex: 'realPrice',
      width: 150,
      slots: { customRender: 'Tag' },
    },
    {
      title: '状态变更',
      dataIndex: 'changeType',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '票型',
      dataIndex: 'ticketTypeName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '航班时间',
      dataIndex: 'departureDatetime',
      width: 150,
      format: 'date|YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '航线名称',
      dataIndex: 'lineName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '船舶名称',
      dataIndex: 'shipName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '船舱名称',
      dataIndex: 'cabinName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '座位号',
      dataIndex: 'seatMemo',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '乘客姓名',
      dataIndex: 'passengerName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '乘客身份证号',
      dataIndex: 'passengerIdNo',
      width: 200,
      slots: { customRender: 'Text' },
      defaultHidden: true,
    },
  ];
}

export function getInnerColumns(): BasicColumn[] {
  return [
    {
      title: '状态变更',
      dataIndex: 'changeType',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '实际支付价格',
      dataIndex: 'realPrice',
      width: 150,
      slots: { customRender: 'Tag' },
    },
    {
      title: '退款金额',
      dataIndex: 'refundAmount',
      width: 100,
      slots: { customRender: 'Tag' },
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      width: 100,
      slots: { customRender: 'Tag' },
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
      slots: { customRender: 'Tag' },
    },
    {
      title: '支付ID',
      dataIndex: 'payId',
      width: 250,
      slots: { customRender: 'Text' },
    },

    {
      title: '变更后关联票号',
      dataIndex: 'ticketNoNew',
      width: 150,
      slots: { customRender: 'Text' },
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
      slots: { customRender: 'Text' },
    },
    {
      title: '变更操作人',
      dataIndex: 'changeUserName',
      width: 100,
      slots: { customRender: 'Text' },
    },
    {
      title: '退款方式',
      dataIndex: 'ticketRefundMethod',
      width: 100,
      slots: { customRender: 'Text' },
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
      slots: { customRender: 'Text' },
    },
    {
      title: '-',
      dataIndex: '',
    },
  ];
}
