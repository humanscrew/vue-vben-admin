<template>
  <Card :title="cardTitle" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { AnalysisConfig } from '../data';

  const { cardTitle } = AnalysisConfig.AgeStructure;

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            color: ['#5ab1ef', '#b6a2de', '#2ec7c9', '#67e0e3', '#2ec7c9'],
            name: '年龄',
            type: 'pie',
            radius: ['40%', '70%'],
            // avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 5,
            },
            label: {
              show: true,
              fontSize: '10',
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: '20岁以下' },
              { value: 1048, name: '20-30岁' },
              { value: 735, name: '30-40岁' },
              { value: 580, name: '40-50岁' },
              { value: 484, name: '50岁以上' },
            ],
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100;
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
