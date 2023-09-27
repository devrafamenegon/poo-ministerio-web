<template>
  <div>
    <h1>Ministérios</h1>
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
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
  }
</style>
