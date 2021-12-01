<template>
  <div class="p-4">
    <GrowCard :growCardList="growCardList" class="enter-y" />
    <SalesAnalysis class="!my-4 enter-y" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitAgeStructure class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'DashboardAnalysis',
  };
</script>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import VisitAgeStructure from './components/VisitAgeStructure.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import SalesAnalysis from './components/SalesAnalysis.vue';
  import { onMounted } from 'vue';
  import { graphqlAPI } from '/@/api/graphql/graphql';
  import { growCardData, timeStore } from './data';

  const loading = ref(true);

  const growCardList = reactive(growCardData);

  onMounted(async () => {
    const { toDay, toMonth, nextDay, nextMonth, lastDay } = timeStore;
    const query = `{
      dashboard {
        toDayVisits: visits(startTime: "${toDay.start}", endTime: "${toDay.end}")
        toMonthVisits: visits(startTime: "${toMonth.start}", endTime: "${toMonth.end}")
        toDaySales: sales(startTime: "${toDay.start}", endTime: "${toDay.end}")
        toMonthSales: sales(startTime: "${toMonth.start}", endTime: "${toMonth.end}")
        nextDayVisits: visits(startTime: "${nextDay.start}", endTime: "${nextDay.end}")
        advanceVisits: visits(startTime: "${nextDay.start}", endTime: "${nextMonth.end}")
        toDayNetCashflow: netCashflow(startTime: "${toDay.start}", endTime: "${toDay.end}")
        toMonthNetCashflow: netCashflow(startTime: "${toMonth.start}", endTime: "${toMonth.end}")
        }
    }`;
    const {
      data: { dashboard },
    } = await graphqlAPI({ query });

    let valueKey = null;
    let totalKey = null;
    growCardList.forEach((item, index) => {
      switch (item.title) {
        case '接待量':
          valueKey = 'toDayVisits';
          totalKey = 'toMonthVisits';
          break;
        case '收入':
          valueKey = 'toDaySales';
          totalKey = 'toMonthSales';
          break;
        case '预售票':
          valueKey = 'nextDayVisits';
          totalKey = 'advanceVisits';
          break;
        case '净收款':
          valueKey = 'toDayNetCashflow';
          totalKey = 'toMonthNetCashflow';
          break;
      }
      growCardList[index].value = Number(dashboard[valueKey]);
      growCardList[index].total = Number(dashboard[totalKey]);
      growCardList[index].loading = false;
    });

    loading.value = false;
  });
</script>
