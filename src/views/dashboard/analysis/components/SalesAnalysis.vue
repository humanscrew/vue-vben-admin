<template>
  <Card
    :tab-list="tabListTitle"
    :loading="loading"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis :options="visitAnalysisOptions" />
    </p>
    <p v-if="activeKey === 'tab2'">
      <VisitAnalysisBar />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue';
  import { Card } from 'ant-design-vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';

  import { dateUtil } from '/@/utils/dateUtil';
  import { timeStore } from '../data';
  import { executeClickhouseAPI } from '/@/api/database/clickhouse';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '当月趋势',
    },
    {
      key: 'tab2',
      tab: '月度人次',
    },
  ];

  const loading = ref(true);
  const visitAnalysisOptions = reactive({});

  function onTabChange(key) {
    activeKey.value = key;
  }

  onMounted(async () => {
    const { toDay, toMonth } = timeStore;
    const daysInMonth = dateUtil(toDay.end).daysInMonth();
    // const thisMonth = formatToDateTime(toDay.end, 'M月');

    const ticketSaleMonth = await executeClickhouseAPI.ticketSale(
      '船票',
      toMonth.start,
      toMonth.end,
      ['visits', 'revenue'],
      ['departure_datetime'],
    );

    const visitsData = ticketSaleMonth.result.map((item) => {
      return item.visits;
    });
    const revenueData = ticketSaleMonth.result.map((item) => {
      return (item.revenue / 10000).toFixed(0);
    });

    visitAnalysisOptions.xAxisData = new Array(daysInMonth)
      .fill('')
      .map((value, index) => index + 1 + '日');
    visitAnalysisOptions.yAxisMaxVisits = Math.max(...visitsData);
    visitAnalysisOptions.yAxisMaxRevenue = Math.max(...revenueData);
    visitAnalysisOptions.visitsData = visitsData;
    visitAnalysisOptions.revenueData = revenueData;

    loading.value = false;
  });
</script>
