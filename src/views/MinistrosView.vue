<template>
  <div class="ministros-wrapper">
    <h1>Ministros</h1>
    <MinistrosTable :ministros="data" @update="getData"></MinistrosTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MinistrosTable from '@/components/MinistrosTable.vue';
import { api, enpointMinistros } from '@/services/config/httpClient';

export default defineComponent({
  name: 'MinistrosView',
  components: {
    MinistrosTable,
  },
  setup() {
    const data = ref([]);
    const isLoading = ref(true);

    const getData = () => {
      api.get(enpointMinistros)
        .then(response => {
          data.value = response.data.data;
          isLoading.value = false;
        })
        .catch(error => {
          console.error('Failed to get data:', error);
          isLoading.value = false;
        });
    };

    return { data, isLoading, getData };
  },
  mounted() {
    this.getData()
  }
});
</script>

<style scoped>
  .ministros-wrapper > h1 {
    font-weight: 600;
    font-size: 24px;
  }
</style>
