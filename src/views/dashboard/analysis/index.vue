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
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import VisitAgeStructure from './components/VisitAgeStructure.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import SalesAnalysis from './components/SalesAnalysis.vue';

  import { onMounted } from 'vue';
  import { executeClickhouseAPI } from '/@/api/database/clickhouse';
  import { growCardData, timeStore } from './data';

  const loading = ref(true);

  const growCardList = reactive(growCardData);

  const executeAPI = executeClickhouseAPI;

  onMounted(async () => {
    const { toDay, toMonth, nextDay } = timeStore;
    const ticketSaleDay = await executeAPI.ticketSale('船票', toDay.start, toDay.end, [
      'visits',
      'revenue',
    ]);
    const ticketSaleMonth = await executeAPI.ticketSale('船票', toMonth.start, toMonth.end, [
      'visits',
      'revenue',
    ]);
    growCardList[0].value = ticketSaleDay.result[0].visits ?? 0;
    growCardList[0].total = ticketSaleMonth.result[0].visits ?? 0;
    growCardList[1].value = ticketSaleDay.result[0].revenue ?? 0;
    growCardList[1].total = ticketSaleMonth.result[0].revenue ?? 0;
    growCardList[0].loading = false;
    growCardList[1].loading = false;

    const advanceSaleDay = await executeAPI.advanceSale('船票', nextDay.start, nextDay.end);
    const advanceSaleTotal = await executeAPI.advanceSale('船票', nextDay.start);
    growCardList[2].value = advanceSaleDay.result[0].advanceSale ?? 0;
    growCardList[2].total = advanceSaleTotal.result[0].advanceSale ?? 0;
    growCardList[2].loading = false;

    const cashFlowDay = await executeAPI.cashFlow('船票', toDay.start, toDay.end);
    const cashFlowMonth = await executeAPI.cashFlow('船票', toMonth.start, toMonth.end);
    growCardList[3].value = cashFlowDay.result[0].cashFlow ?? 0;
    growCardList[3].total = cashFlowMonth.result[0].cashFlow ?? 0;
    growCardList[3].loading = false;
  });

  loading.value = false;
</script>
