<template>
  <div>
    <h1>Ministérios</h1>
    <PresidentesTable :presidentes="presidentes"></PresidentesTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PresidentesTable from '@/components/PresidentesTable.vue';

export default defineComponent({
  name: 'PresidentesView',
  components: {
    PresidentesTable,
  },
  data() {
    return {
      presidentes: [
        {
          id: 1,
          nome: 'Ministério da Saúde',
          numFuncionarios: 500,
          verba: 1000000,
        },
        {
          id: 2,
          nome: 'Ministério da Educação',
          numFuncionarios: 300,
          verba: 800000,
        },
      ],
    };
  },
});
</script>

<style scoped>
/* Estilize a tabela e os botões de acordo com o seu design */
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
