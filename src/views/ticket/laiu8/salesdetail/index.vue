<template>
  <CustomTable :tableConfig="tableConfig" />
</template>

<script lang="ts">
  export default {
    name: 'TicketSalesDetail',
  };
</script>
<script lang="ts" setup>
  import { CustomTable } from '/@/views/common/CustomTable';
  import { tableConfig } from './tableConfig.tsx';
</script>
