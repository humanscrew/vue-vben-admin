<template>
  <Dropdown placement="bottomCenter" :getPopupContainer="getPopupContainer" size="small">
    <a-button type="dashed">
      <div class="font-bold inline mr-2">{{ tableConfig[selectedKeys[0]].tableSetting.title }}</div>
      <DownOutlined />
    </a-button>

    <template #overlay>
      <Menu @click="handleMenuClick" selectable v-model:selectedKeys="selectedKeys">
        <MenuItem v-for="(item, index) in tableConfig" :key="index">
          <span>{{ item.tableSetting.title }}</span>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { getPopupContainer } from '/@/utils';
  import { Dropdown, Menu } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  const MenuItem = Menu.Item;

  const props = defineProps({
    tableConfig: Array,
    tableIndex: Number,
  });

  const { tableConfig, tableIndex } = unref(props);

  const selectedKeys = ref([tableIndex]);

  const handleMenuClick = ({ key }) => {
    selectedKeys.value = [key];
  };
</script>
