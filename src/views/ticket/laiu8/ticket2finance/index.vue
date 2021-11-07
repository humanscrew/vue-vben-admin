<template>
  <JSpreadSheet @workbook="getworkbook" :apiConfig="apiConfig" :setting="setting" />
</template>

<script lang="ts">
  export default {
    name: 'Ticket2Finance',
  };
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import JSpreadSheet from '/@/components/jspreadsheet';

  import { getTicket2FinanceAPI } from '/@/api/ticket/ticket';

  const workbook = ref();
  const apiConfig = {
    api: getTicket2FinanceAPI,
    params: {
      sorter: [{ field: 'date', type: 'desc' }],
    },
  };
  const setting = {
    worksheets: [
      {
        // pagination: 50,
        // paginationOptions: [20, 50, 100, 200],
        worksheetName: '收入确认明细表',
        parseFormulas: false,
        columns: [
          {
            title: '类型',
            name: 'type',
            type: 'text',
            width: 150,
          },
          {
            title: '日期',
            name: 'date',
            type: 'calendar',
            options: { format: 'YYYY-MM-DD' },
            locale: 'zh-CN',
            width: 150,
          },
          {
            title: '支付方式',
            name: 'paymentMethod',
            type: 'text',
            width: 100,
          },
          {
            title: '客户类型',
            name: 'userType',
            type: 'text',
            width: 100,
          },
          {
            title: '客户名称',
            name: 'userName',
            type: 'text',
            width: 400,
          },
          {
            title: '产品类型',
            name: 'productType',
            type: 'text',
            width: 100,
          },
          {
            title: '实际金额',
            name: 'ticketPrice',
            type: 'number',
            mask: '0.00',
            width: 100,
            align: 'right',
          },
          {
            title: '产生积分',
            name: 'getVoucher',
            type: 'number',
            mask: '0.00',
            width: 100,
            align: 'right',
          },
          {
            title: '使用积分',
            name: 'useVoucher',
            type: 'number',
            mask: '0.00',
            width: 100,
            align: 'right',
          },
        ],
      },
    ],
  };

  const getworkbook = (value) => {
    workbook.value = value;
  };
</script>
