import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '来游吧ID',
      dataIndex: 'clientId',
      width: 100,
      sorter: true,
    },
    {
      title: '客户类型',
      dataIndex: 'type',
      width: 100,
      filters: [
        { text: 'OTA', value: 'OTA' },
        { text: 'VIP', value: 'VIP' },
      ],
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      width: 250,
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
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'uniformSocialCreditCode',
      width: 200,
    },
    {
      title: '客户拓展负责人',
      dataIndex: 'manager',
      width: 150,
    },
    {
      title: '合约起始时间',
      width: 150,
      sorter: true,
      format: 'date|YYYY-MM-DD',
      dataIndex: 'cooperateStartTime',
    },

    {
      title: '合约到期时间',
      width: 150,
      sorter: true,
      format: 'date|YYYY-MM-DD',
      dataIndex: 'cooperateEndTime',
    },
    {
      title: '客户地址',
      width: 250,
      dataIndex: 'address',
    },
    {
      title: '联系方式',
      width: 200,
      dataIndex: 'mobile',
    },
  ];
}
