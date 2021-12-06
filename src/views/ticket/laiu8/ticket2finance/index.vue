<template>
  <CustomTable :tableData="tableData" />
</template>

<script lang="ts">
  export default {
    name: 'Ticket2Finance',
  };
</script>
<script lang="ts" setup>
  import CustomTable from '/@/views/common/CustomTable.vue';
  import { tableData } from './tableData.tsx';
</script>
