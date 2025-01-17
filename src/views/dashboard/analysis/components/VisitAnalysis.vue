<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    ...basicProps,
    options: {
      type: Object,
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(async () => {
    const { options } = props;
    setOptions({
      // visualMap: [
      //   {
      //     show: false,
      //     type: 'continuous',
      //     seriesIndex: 1,
      //     min: 0,
      //     max: options.yAxisMaxRevenue * 1.5,
      //   },
      // ],

      // title: [
      //   {
      //     left: 'center',
      //     text: '',
      //   },
      // ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      toolbox: {
        show: true,
        right: '10%',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          // magicType: { show: true, type: ['line', 'bar'] },
          // restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        // name: '日期',
        type: 'category',
        // boundaryGap: false,
        data: options.xAxisData,
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          // show: false,
          alignWithLabel: true,
        },
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '接待量/人次',
          position: 'left',
          max: (options.yAxisMaxVisits * 1.1).toFixed(0),
          // splitNumber: 4,
          axisTick: {
            show: false,
          },
          // splitArea: {
          //   show: true,
          //   areaStyle: {
          //     color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
          //   },
          // },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
        },
        {
          type: 'value',
          name: '收入/万元',
          position: 'right',
          min: 0,
          max: (options.yAxisMaxRevenue * 1.1).toFixed(0),
          // splitNumber: 4,
          // axisTick: {
          //   show: false,
          // },
          axisLabel: {
            formatter: '{value}',
          },
          // splitArea: {
          //   show: true,
          //   areaStyle: {
          //     color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
          //   },
          // },
          splitLine: {
            show: false,
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
      legend: {
        data: ['接待量', '收入'],
      },
      series: [
        {
          name: '接待量',
          yAxisIndex: 0,
          smooth: true,
          data: options.visitsData,
          type: 'bar',
          barWidth: '40%',
          label: {
            show: true,
            position: 'top',
            color: '#0fa5ef',
            fontSize: 10,
            fontWeight: 'normal',
            distance: 10,
          },
          // barCategoryGap: '20%',
          // areaStyle: {},
          itemStyle: {
            // color: '#019680',
            borderRadius: [20, 20, 0, 0],
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              ['#1CD8A8', '#2FAEF2'].map((color, offset) => ({ color, offset })),
            ),
          },
          // emphasis: {
          //   focus: 'series',
          // },
          // animationDelay: function (idx) {
          //   return idx * 10;
          // },
        },

        {
          name: '收入',
          yAxisIndex: 1,
          smooth: true,
          data: options.revenueData,
          type: 'line',
          // areaStyle: {},
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#fe9a',
              },
              {
                offset: 1,
                color: '#fe9a8b',
              },
            ]),
            shadowColor: 'rgba(254,154,139, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20,
          },
          itemStyle: {
            color: '#fe9a8b',
            borderColor: '#fe9a8b',
          },
        },
      ],
    });
  });
</script>
