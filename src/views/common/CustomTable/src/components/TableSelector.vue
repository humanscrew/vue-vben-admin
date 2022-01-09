<template>
  <Dropdown placement="bottomCenter" :getPopupContainer="getPopupContainer" size="small">
    <a-button type="dashed">
      <div class="font-bold inline mr-2">{{ tableConfig[tableIndex].title }}</div>
      <DownOutlined />
    </a-button>

    <template #overlay>
      <Menu @click="handleMenuClick" selectable v-model:selectedKeys="selectedKeys">
        <Menu.Item v-for="(item, index) in tableConfig" :key="index">
          <span>{{ item.title }}</span>
        </Menu.Item>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
  import { ref, toRefs } from 'vue';
  import { getPopupContainer } from '/@/utils';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    tableConfig: Array,
    tableIndex: Number,
  });

  const emit = defineEmits(['change']);

  const { tableConfig, tableIndex } = toRefs(props);

  const selectedKeys = ref([tableIndex.value]);

  const handleMenuClick = ({ key }) => {
    selectedKeys.value = [key];
    emit('change', key);
  };
</script>
