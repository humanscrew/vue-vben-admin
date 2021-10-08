<template>
  <div class="p-4">
    <BasicTable
      title="销售明细"
      titleHelpMessage="单元格点击即可复制"
      bordered
      :canResize="canResize"
      showTableSetting
      :fetchSetting="fetchSetting"
      :filterFn="filterFn"
      :sortFn="sortFn"
      :isTreeTable="true"
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
      <template #Lock="{ record }">
        <Icon
          v-if="record"
          :icon="
            record.isLock
              ? LockIcon[record.ticketStatus].icon || LockIcon.OTHER.icon
              : UnLockIcon.UNLOCK.icon
          "
          :color="
            record.isLock
              ? LockIcon[record.ticketStatus].color || LockIcon.OTHER.color
              : UnLockIcon.UNLOCK.color
          "
        />
      </template>
      <template #Tag="{ text }">
        <Tag @click="handleCopy(text)" :color="tagColor(text)">
          {{ text }}
        </Tag>
      </template>
      <template #Text="{ text }">
        <div @click="handleCopy(text)" class="text-sm truncate">
          {{ text }}
        </div>
      </template>
      <template #expandedRowRender="{ record }">
        <BasicTable
          v-if="record.ticketStatus != '已取消'"
          :dataSource="[record]"
          :columns="innerColumns"
          :fetchSetting="fetchSetting"
          :filterFn="filterFn"
          :sortFn="sortFn"
          :pagination="false"
          :canResize="false"
        >
          <template #Tag="{ text }">
            <Tag @click="handleCopy(text)" :color="tagColor(text)">
              {{ text }}
            </Tag>
          </template>
          <template #Text="{ text }">
            <div @click="handleCopy(text)" class="text-sm truncate">
              {{ text }}
            </div>
          </template>
        </BasicTable>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { Tooltip, Tag } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { getBasicColumns, getInnerColumns } from './tableData';
  import { getTicketLaiu8API } from '/@/api/sys/ticket';
  import type { SorterResult } from '/@/components/Table';
  import { OrderEnum } from '../../../../../enums/tableEnum';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';

  const [register] = useTable({
    api: getTicketLaiu8API,
    columns: getBasicColumns(),
  });

  const innerColumns = getInnerColumns();

  const fetchSetting = {
    pageField: 'page',
    sizeField: 'per_page',
    listField: 'results',
    totalField: 'total',
  };

  const canResize = ref(true);

  const filterFn = (filters) => {
    return filters;
  };

  const sortFn = (sortInfo: SorterResult) => {
    const { field, order } = sortInfo;
    const orderType = OrderEnum[order];
    return {
      field,
      order: orderType,
    };
  };

  function toggleCanResize() {
    canResize.value = !canResize.value;
  }

  enum UnLockIcon {
    UNLOCK = { icon: 'mdi:sort-clock-descending-outline', color: 'grey' },
  }
  enum LockIcon {
    '一检' = { icon: 'teenyicons:tick-circle-solid', color: 'green' },
    '二检' = { icon: 'teenyicons:tick-circle-solid', color: 'green' },
    '出票成功' = { icon: 'teenyicons:tick-circle-solid', color: 'green' },
    '已取消' = { icon: 'clarity:cancel-line', color: 'grey' },
    '已退款' = { icon: 'ic:sharp-cancel', color: '#f07c76' },
    '改签废票' = { icon: 'tabler:zodiac-cancer', color: 'orange' },
    OTHER = { icon: 'clarity:unknown-status-line', color: 'orange' },
  }

  function handleColumnChange(data: ColumnChangeParam[]) {
    console.log('ColumnChanged', data);
  }

  const tagColor = (text) => {
    enum ColorEnum {
      '来游吧' = 'blue',
      '已退款' = 'red',
      '一检' = 'green',
      '二检' = 'green',
      '出票成功' = 'green',
      '改签废票' = 'orange',
      '微信' = '#87d068',
      '支付宝' = '#2db7f5',
    }
    const color = ColorEnum[text];
    return color;
  };

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
