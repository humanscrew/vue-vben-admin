<template>
  <div>
    <div ref="spreadsheetRef"></div>
    <Loading :loading="loading" :absolute="true" :tip="loadingTip" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'JSpreadSheet',
  };
</script>
<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  import { isObject } from '/@/utils/is';
  import { useLayoutHeight } from '/@/layouts/default/content/useContentViewHeight';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { deepMerge } from '/@/utils';
  import { Loading } from '/@/components/Loading';

  import 'jspreadsheet/dist/jspreadsheet.css';
  import 'jsuites/dist/jsuites.css';

  import jspreadsheet from 'jspreadsheet';
  import jsuites from 'jsuites';
  import setting from './settings';

  import zh_CN from './lang/zh_CN';
  jspreadsheet.setDictionary(zh_CN);

  const spreadsheetRef = ref();
  setting.root = spreadsheetRef.value;

  const props = defineProps({
    apiConfig: Object,
    setting: Object,
  });
  const emits = defineEmits(['workbook']);

  let workbook = null;

  const pageOptions = {
    page: 1,
    pageSize: 500,
    pageList: [1],
    total: 0,
  };

  let loading = ref(false);
  const loadingTip = '加载中...';
  const getTableData = async () => {
    loading.value = true;
    const response = await props.apiConfig.api(
      deepMerge(props.apiConfig.params, {
        page: pageOptions.page,
        per_page: pageOptions.pageSize,
      }),
    );
    loading.value = false;
    return response;
  };

  setting.toolbar = {
    // container: true,
    badge: true,
    title: true,
    // responsive: true,
    items: [
      {
        type: 'label',
        tooltip: '总条数',
        content: '共' + pageOptions.total + '条',
      },
      {
        type: 'divisor',
        tooltip: '分隔符',
      },
      {
        content: 'save',
        tooltip: '保存',
        onclick: function () {
          jspreadsheet.current?.download();
        },
      },
      {
        type: 'divisor',
        tooltip: '分隔符',
      },
      {
        type: 'select',
        tooltip: '字体',
        width: 150,
        options: ['微软雅黑', '宋体', 'Times New Roman', 'Verdana', 'Arial', 'Courier New'],
        render: function (e) {
          return '<span>' + e + '</span>';
        },
        onchange: function (a, b, c, d) {
          jspreadsheet.current?.setStyle(jspreadsheet.current?.getSelected(), 'font-family', d);
        },
      },
      {
        type: 'divisor',
        tooltip: '分隔符',
      },
      {
        type: 'select',
        tooltip: '页码',
        width: 90,
        options: pageOptions.pageList,
        render: function (e) {
          return '<span>' + '第' + e + '页' + '</span>';
        },
        onchange: async (a, b, c, d) => {
          pageOptions.page = d;
          const { result: tableData } = await getTableData();

          jspreadsheet.current?.setData(tableData);
        },
      },
      {
        type: 'select',
        tooltip: '条数',
        options: [100, 500, 1000, 2000, 3000],
        value: '1',
        render: function (e) {
          return '<span>' + e + '条/页' + '</span>';
        },
        onchange: async (a, b, c, d) => {
          pageOptions.pageSize = d;
          pageOptions.page = 1;
          const { result: tableData, pages } = await getTableData();
          jspreadsheet.current?.setData(tableData);
          pageOptions.pageList = new Array(pages).fill('').map((value, index) => {
            return ++index;
          });

          setting.toolbar.items.forEach((value, index) => {
            value.tooltip === '条数' &&
              (setting.toolbar.items[index].value = setting.toolbar.items[index].options.indexOf(
                pageOptions.pageSize,
              ));
            value.tooltip === '页码' &&
              ((setting.toolbar.items[index].options = pageOptions.pageList) ||
                (setting.toolbar.items[index].value = 0));
          });
          jsuites.toolbar(document.querySelector('.jss_toolbar'), setting.toolbar);
          jspreadsheet.current.setConfig(setting);
        },
      },

      {
        type: 'divisor',
        tooltip: '分隔符',
      },
      {
        content: 'search',
        tooltip: '查找',
        onclick: function (a, b, c) {
          if (c.children[0].innerText == 'search') {
            jspreadsheet.current?.showSearch();
            c.children[0].innerText = 'search_off';
          } else {
            jspreadsheet.current?.hideSearch();
            c.children[0].innerText = 'search';
          }
        },
        tooltip: '查询',
        updateState: function (a, b, c, worksheet) {
          // Call this one when the worksheet is opened and on the selection of any cells
          if (worksheet.options.search == true) {
            c.children[0].innerText = 'search_off';
          } else {
            c.children[0].innerText = 'search';
          }
        },
      },
    ],
  };

  // setting.onchange = (...args) => {
  //   console.log(args);
  // };

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

    props.setting.worksheets.forEach((...args) => {
      const sheetSetting = setting.worksheets[args[1]];
      sheetSetting.tableHeight = `${tableHeight - 100}px`;
      sheetSetting.tableWidth = `${tableWidth}px`;

      let totalWidth = 0;
      const propSheetColumns = props.setting.worksheets[args[1]].columns;
      propSheetColumns.forEach((column) => {
        const width = ~~column.width || 100;
        totalWidth += width;
        return width;
      });

      if (!workbook) {
        return;
      }

      const worksheet = workbook[args[1]];
      worksheet.setConfig(sheetSetting);
      propSheetColumns.forEach((column, index) => {
        worksheet?.setWidth(index, (tableWidth - 50) * (column.width / totalWidth));
      });
    });
  }

  useWindowSizeFn(calcSize, 150, { immediate: true });

  onMounted(async () => {
    if (props.setting.worksheets.length) {
      props.setting.worksheets.forEach((value, index) => {
        deepMergeSetting(setting.worksheets[index], value);
      });
    }
    deepMergeSetting(setting, props.setting);

    const { result: tableData, pages, total } = await getTableData();

    pageOptions.pageList = new Array(pages).fill('').map((value, index) => {
      return ++index;
    });
    pageOptions.total = total;

    setting.toolbar.items.forEach((value, index) => {
      value.tooltip === '总条数' &&
        (setting.toolbar.items[index].content = '共' + pageOptions.total + '条');
      value.tooltip === '条数' && setting.toolbar.items[index].options.push(pageOptions.total);
      value.tooltip === '页码' && (setting.toolbar.items[index].options = pageOptions.pageList);
    });

    workbook = jspreadsheet(spreadsheetRef.value, setting);

    calcSize();
    workbook[0].setData(tableData);
    emits('workbook', workbook);
  });
</script>

<style lang="less">
  @font-url: '/@/assets/fonts/material-icons.woff2';

  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(@font-url) format('woff2');
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
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .jpicker-content {
    max-height: 40vh;
    overflow: auto;
  }
</style>
