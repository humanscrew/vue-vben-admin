<template>
  <div
    id="luckysheet"
    style="
      margin: 0px;
      padding: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
    "
  ></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { config } from './config';
  import { merge } from 'lodash-es';

  const props = defineProps({
    options: {
      type: Object,
    },
  });

  onMounted(() => {
    let { options } = props;
    options = merge(config.defaultOptions, options);
    luckysheet.create(options);
  });
</script>

<style lang="less">
  #luckysheet * {
    box-sizing: initial;
    outline: 0;
  }
</style>
