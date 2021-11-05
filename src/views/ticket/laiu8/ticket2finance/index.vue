<template>
  <JSpreadSheet @workbook="getworkbook" :setting="setting" />
</template>

<script lang="ts">
  export default {
    name: 'Ticket2Finance',
  };
</script>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import JSpreadSheet from '/@/components/jspreadsheet';

  import { getTicket2FinanceAPI } from '/@/api/ticket/ticket';

  const workbook = ref();
  const setting = {
    worksheets: [
      {
        // pagination: 50,
        // paginationOptions: [20, 50, 100, 200],
        columns: [
          {
            title: '类型',
            name: 'type',
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
            width: 100,
          },
          {
            title: '客户类型',
            name: 'userType',
            width: 100,
          },
          {
            title: '客户名称',
            name: 'userName',
            width: 400,
          },
          {
            title: '产品类型',
            name: 'productType',
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

  onMounted(async () => {
    const { result: tableData } = await getTicket2FinanceAPI({});
    workbook.value[0].setData(tableData);
  });
</script>
