<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SalesAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitAgeStructure class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import VisitAgeStructure from './components/VisitAgeStructure.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';
  import SalesAnalysis from './components/SalesAnalysis.vue';

  import { onMounted } from 'vue';
  import { executeSqlAPI, sqlStatementParams } from '/@/api/sys/sql';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  onMounted(async () => {
    tickets = await executeSqlAPI(sqlStatementParams.visitorCount());
    console.log(tickets);
  });
</script>
