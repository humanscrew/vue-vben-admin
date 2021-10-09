<template>
  <div class="p-4">
    <BasicTable
      bordered
      :title="tableSetting.title"
      :titleHelpMessage="tableSetting.titleHelpMessage"
      :canResize="canResize"
      showTableSetting
      @columns-change="handleColumnChange"
      @register="register"
    >
      <template #toolbar>
        <Tooltip
          :title="!canResize ? '自适应高度' : '取消自适应'"
          placement="bottom"
          :mouseEnterDelay="0.5"
          @click="toggleCanResize"
        >
          <Icon :icon="canResize ? 'bi:arrows-expand' : 'bi:arrows-collapse'" />
        </Tooltip>
      </template>
      <template #Text="{ text }">
        <div @click="handleCopy(text)" class="text-sm truncate">
          {{ text }}
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { getBasicColumns, tableSetting } from './components/tableData';
  import { Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { getLaiu8ClientAPI } from '/@/api/sys/ticket';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  const [register] = useTable({
    api: getLaiu8ClientAPI,
    columns: getBasicColumns(),
  });

  const canResize = ref(true);

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  function handleColumnChange(data: ColumnChangeParam[]) {
    console.log('ColumnChanged', data);
  }

  const { createMessage } = useMessage();
  const { clipboardRef, copiedRef } = useCopyToClipboard();
  const handleCopy = (value) => {
    if (!value) {
      createMessage.warning('空值复制无效');
      return;
    }
    clipboardRef.value = value;
    if (unref(copiedRef)) {
      createMessage.warning('已复制');
      return;
    }
    createMessage.error('复制失败');
  };
</script>
