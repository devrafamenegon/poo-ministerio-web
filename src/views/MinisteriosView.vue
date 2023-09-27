<template>
  <div class="ministerios-wrapper">
    <h1>Ministérios</h1>
    <MinisteriosTable v-if="!isLoading" :ministerios="ministerios" @atualizar-lista="buscarMinisterios"></MinisteriosTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MinisteriosTable from '@/components/MinisteriosTable.vue';
import { api, enpointMinisterios } from '@/services/config/httpClient';

export default defineComponent({
  name: 'MinisteriosView',
  components: {
    MinisteriosTable,
  },
  setup() {
    const ministerios = ref([]);
    const isLoading = ref(true);

    const buscarMinisterios = () => {
      api.get(enpointMinisterios)
        .then(response => {
          ministerios.value = response.data.data;
          isLoading.value = false;
        })
        .catch(error => {
          console.error('Erro ao buscar ministérios:', error);
          isLoading.value = false;
        });
    };

    return { ministerios, isLoading, buscarMinisterios };
  },
  mounted() {
    this.buscarMinisterios()
  }
});

</script>

<style scoped>
  .ministerios-wrapper > h1 {
    font-weight: 600;
    font-size: 24px;
  }
</style>
