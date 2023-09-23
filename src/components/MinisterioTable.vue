<template>
  <div>
    <h2>Ministérios</h2>
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
        <tr v-for="ministerio in ministerios" :key="ministerio.id">
          <td>{{ ministerio.id }}</td>
          <td>{{ ministerio.nome }}</td>
          <td>{{ ministerio.numFuncionarios }}</td>
          <td>{{ ministerio.verba }}</td>
          <td>
            <button @click="editarMinisterio(ministerio)">Editar</button>
            <button @click="excluirMinisterio(ministerio)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Ministerio {
  id: number;
  nome: string;
  numFuncionarios: number;
  verba: number;
}

export default defineComponent({
  name: 'MinisterioTable',
  props: {
    ministerios: {
      type: Array as () => Ministerio[],
      required: true,
    },
  },
  methods: {
    editarMinisterio(ministerio: Ministerio): void {
      // Implemente a lógica para editar o ministério aqui
      // Você pode abrir um formulário de edição preenchido com os dados do ministério
    },

    excluirMinisterio(ministerio: Ministerio): void {
      // Implemente a lógica para excluir o ministério aqui
      // Envie uma solicitação para o endpoint de exclusão
    }
  }
});
</script>

<style scoped>
/* Estilos do componente aqui */
</style>
