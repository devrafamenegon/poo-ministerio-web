<template>
  <div>
    <h2>Presidentes</h2>
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
        <tr v-for="presidente in presidentes" :key="presidente.id">
          <td>{{ presidente.id }}</td>
          <td>{{ presidente.nome }}</td>
          <td>{{ presidente.numFuncionarios }}</td>
          <td>{{ presidente.verba }}</td>
          <td>
            <button @click="editarPresidente(presidente)">Editar</button>
            <button @click="excluirPresidente(presidente)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Presidente {
  id: number;
  nome: string;
  numFuncionarios: number;
  verba: number;
}

export default defineComponent({
  name: 'PresidentesTable',
  props: {
    presidentes: {
      type: Array as () => Presidente[],
      required: true,
    },
  },
  methods: {
    editarPresidente(presidente: Presidente): void {
      // Implemente a lógica para editar o ministério aqui
      // Você pode abrir um formulário de edição preenchido com os dados do ministério
    },

    excluirPresidente(presidente: Presidente): void {
      // Implemente a lógica para excluir o ministério aqui
      // Envie uma solicitação para o endpoint de exclusão
    }
  }
});
</script>

<style scoped>
/* Estilos do componente aqui */
</style>
