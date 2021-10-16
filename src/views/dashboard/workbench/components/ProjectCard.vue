<template>
  <Card title="自驱组织" :loading="loading">
    <template #extra>
      <a-button type="link" size="small">更多</a-button>
    </template>

    <template v-for="item in groupList" :key="item">
      <CardGrid class="!md:w-1/3 !w-full">
        <span class="flex">
          <Icon :icon="item.icon" :color="item.color" size="30" />
          <span class="text-lg ml-4">{{ item.name }}</span>
        </span>
        <!-- <div class="flex mt-2 text-secondary justify-end">{{ item.desc }}</div> -->
        <div class="flex justify-between text-secondary mt-4">
          <span>{{ item.location }}</span>
          <span>{{ item.desc }}</span>
        </div>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { getCompanyGroupAPI } from '/@/api/sys/company';

  const CardGrid = Card.Grid;
  const loading = ref(true);
  const groupList = ref([]);

  onMounted(async () => {
    const { companyGroups } = await getCompanyGroupAPI();
    groupList.value = companyGroups;
    loading.value = false;
  });
</script>
