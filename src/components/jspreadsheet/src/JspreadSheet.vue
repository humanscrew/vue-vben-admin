<template>
  <div ref="spreadsheetRef"></div>
</template>

<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  import { isObject } from '/@/utils/is';
  import { useLayoutHeight } from '/@/layouts/default/content/useContentViewHeight';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  import 'jspreadsheet/dist/jspreadsheet.css';
  import 'jsuites/dist/jsuites.css';

  import jspreadsheet from 'jspreadsheet';
  import jsuites from 'jspreadsheet';
  import setting from './settings';

  import zh_CN from './lang/zh_CN';
  jsuites.setDictionary(zh_CN);

  const spreadsheetRef = ref();
  const props = defineProps({
    setting: Object,
  });
  const emits = defineEmits(['workbook']);

  const workbook = ref();

  const deepMergeSetting = (src: any = {}, target: any = {}, exclude = 'worksheets') => {
    let key: string;
    for (key in target) {
      if (key === exclude) {
        continue;
      }
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
  };

  function calcSize() {
    const unSpreadsheetRef = unref(spreadsheetRef);
    if (!unSpreadsheetRef) {
      return;
    }

    const { headerHeightRef } = useLayoutHeight();
    const tableHeight = document.documentElement.clientHeight - headerHeightRef.value;

    const { getCalcContentWidth } = useMenuSetting();
    const reg = new RegExp(`100% - (.*?)px`);
    const menuWidth = reg.exec(unref(getCalcContentWidth))[1];
    const tableWidth = `${document.documentElement.clientWidth - menuWidth - 50}`;

    props.setting.worksheets.forEach((...arg) => {
      const sheetSetting = setting.worksheets[arg[1]];
      sheetSetting.tableHeight = `${tableHeight - 100}px`;
      sheetSetting.tableWidth = `${tableWidth}px`;

      let totalWidth = 0;
      const propSheetCloumns = props.setting.worksheets[arg[1]].columns;
      propSheetCloumns.forEach((column) => {
        const width = ~~column.width || 100;
        totalWidth += width;
        return width;
      });

      if (!workbook.value) {
        return;
      }

      const worksheet = workbook.value[arg[1]];
      worksheet.setConfig(sheetSetting);
      propSheetCloumns.forEach((column, index) => {
        worksheet.setWidth(index, (tableWidth - 50) * (column.width / totalWidth));
      });
    });
  }

  useWindowSizeFn(calcSize, 150, { immediate: true });

  onMounted(() => {
    calcSize();
    if (props.setting.worksheets.length) {
      props.setting.worksheets.forEach((value, index) => {
        deepMergeSetting(setting.worksheets[index], value);
      });
    }
    deepMergeSetting(setting, props.setting);
    workbook.value = jspreadsheet(spreadsheetRef.value, setting);
    emits('workbook', workbook.value);
  });
</script>

<style lang="less" scoped>
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url('/@/assets/fonts/material-icons.woff2') format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    // -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
</style>
