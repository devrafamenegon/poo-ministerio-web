<template>
  <div>
    <h2>Secretarías</h2>
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
        <tr v-for="secretaria in secretarias" :key="secretaria.id">
          <td>{{ secretaria.id }}</td>
          <td>{{ secretaria.nome }}</td>
          <td>{{ secretaria.numFuncionarios }}</td>
          <td>{{ secretaria.verba }}</td>
          <td>
            <button @click="editarSecretaria(secretaria)">Editar</button>
            <button @click="excluirSecretaria(secretaria)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Secretaria {
  id: number;
  nome: string;
  numFuncionarios: number;
  verba: number;
}

export default defineComponent({
  name: 'SecretariasTable',
  props: {
    secretarias: {
      type: Array as () => Secretaria[],
      required: true,
    },
  },
  methods: {
    editarSecretaria(secretaria: Secretaria): void {
      // Implemente a lógica para editar o ministério aqui
      // Você pode abrir um formulário de edição preenchido com os dados do ministério
    },

    excluirSecretaria(secretaria: Secretaria): void {
      // Implemente a lógica para excluir o ministério aqui
      // Envie uma solicitação para o endpoint de exclusão
    }
  }
});
</script>

<style scoped>
/* Estilos do componente aqui */
</style>
