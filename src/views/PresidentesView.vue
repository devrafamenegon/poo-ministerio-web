<template>
  <div class="presidentes-wrapper">
    <h1>Presidentes</h1>
    <PresidentesTable :presidentes="data" @update="getData"></PresidentesTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PresidentesTable from '@/components/PresidentesTable.vue';
import { api, enpointPresidentes } from '@/services/config/httpClient';

export default defineComponent({
  name: 'PresidentesView',
  components: {
    PresidentesTable,
  },
  setup() {
    const data = ref([]);
    const isLoading = ref(true);

    const getData = () => {
      api.get(enpointPresidentes)
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
  .presidentes-wrapper > h1 {
    font-weight: 600;
    font-size: 24px;
  }
</style>
