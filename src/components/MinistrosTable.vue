<template>
  <div>
    <h2>Ministros</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Número de Funcionários</th>
          <th>Verba</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ministro in ministros" :key="ministro.id">
          <td>{{ ministro.id }}</td>
          <td>{{ ministro.nome }}</td>
          <td>{{ ministro.numFuncionarios }}</td>
          <td>{{ ministro.verba }}</td>
          <td>
            <button @click="editarMinistro(ministro)">Editar</button>
            <button @click="excluirMinistro(ministro)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Ministro {
  id: number;
  nome: string;
  numFuncionarios: number;
  verba: number;
}

export default defineComponent({
  name: 'MinistrosTable',
  props: {
    ministros: {
      type: Array as () => Ministro[],
      required: true,
    },
  },
  methods: {
    editarMinistro(ministro: Ministro): void {
      // Implemente a lógica para editar o ministério aqui
      // Você pode abrir um formulário de edição preenchido com os dados do ministério
    },

    excluirMinistro(ministro: Ministro): void {
      // Implemente a lógica para excluir o ministério aqui
      // Envie uma solicitação para o endpoint de exclusão
    }
  }
});
</script>

<style scoped>
/* Estilos do componente aqui */
</style>
