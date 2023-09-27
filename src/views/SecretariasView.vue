<template>
  <div class="secretarias-wrapper">
    <h1>Secretarías</h1>
    <SecretariasTable :secretarias="data" @update="getData"></SecretariasTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SecretariasTable from '@/components/SecretariasTable.vue';
import { api, enpointSecretarias } from '@/services/config/httpClient';

export default defineComponent({
  name: 'SecretariasView',
  components: {
    SecretariasTable,
  },
  setup() {
    const data = ref([]);
    const isLoading = ref(true);

    const getData = () => {
      api.get(enpointSecretarias)
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
  .secretarias-wrapper > h1 {
    font-weight: 600;
    font-size: 24px;
  }
</style>
