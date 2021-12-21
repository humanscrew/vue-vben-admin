<template>
  <LuckySheet v-loading="loading" />
</template>

<script lang="ts">
  export default {
    name: 'VoucherGenerate',
  };
</script>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { LuckySheet } from '/@/components/LuckySheet';

  const loading = ref(true);

  onMounted(() => {
    loading.value = false;
  });
</script>
