<template>
  <div class="ministerios-wrapper">
    <h1>Ministérios</h1>
    <MinisteriosTable :ministerios="ministerios"></MinisteriosTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MinisteriosTable from '@/components/MinisteriosTable.vue';

export default defineComponent({
  name: 'MinisteriosView',
  components: {
    MinisteriosTable,
  },
  data() {
    return {
      ministerios: [
        {
          id: 1000,
          nome: 'Ministério da SaúdeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAA',
          numFuncionarios: 5000000,
          verba: 100000000,
        },
        {
          id: 2,
          nome: 'Ministério da Educação',
          numFuncionarios: 300,
          verba: 800000,
        },
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
  
</style>
