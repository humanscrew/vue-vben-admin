<template>
  <CustomTable :tableData="tableData" />
</template>

<script lang="ts">
  export default {
    name: 'ClientManagement',
  };
</script>
<script lang="ts" setup>
  import { CustomTable } from '/@/views/common/CustomTable/index';
  import { tableData } from './tableData.tsx';
</script>
