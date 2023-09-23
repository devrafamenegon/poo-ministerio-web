<template>
  <div>
    <h1>Ministérios</h1>
    <MinisterioTable></MinisterioTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MinisterioTable from '@/components/MinisterioTable.vue';

export default defineComponent({
  name: 'MinisterioTable',
  components: {
    MinisterioTable,
  },
  // Lógica da view aqui
});
</script>

<style scoped>
/* Estilos da view aqui */
</style>
