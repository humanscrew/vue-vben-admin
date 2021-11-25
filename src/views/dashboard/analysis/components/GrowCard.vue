<template>
  <div class="md:flex">
    <div v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="item.loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">
            <template #icon v-if="item.loading">
              <sync-outlined :spin="true" />
            </template>
            {{ item.action }}
          </Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo
            :prefix="item.prefix"
            :suffix="item.suffix"
            :startVal="0"
            :endVal="item.value"
            class="text-2xl"
          />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>{{ item.totalExtent }}</span>
          <CountTo :prefix="item.prefix" :suffix="item.suffix" :startVal="0" :endVal="item.total" />
        </div>
      </Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import { SyncOutlined } from '@ant-design/icons-vue';

  defineProps({
    loading: {
      type: Boolean,
    },
    growCardList: {
      type: Object,
    },
  });
</script>
