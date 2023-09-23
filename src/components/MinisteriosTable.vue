<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Nome</th>
          <th>Número de Funcionários</th>
          <th>Verba</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ministerio in ministerios"
          :key="ministerio.id"
          :class="{ 'selected-row': ministerio === ministerioSelecionado }"
        >
          <td>
            <input
              type="radio"
              id="radio-select"
              @change="selecionarMinisterio(ministerio)"
              :checked="ministerio === ministerioSelecionado"
            />
          </td>
          <td>{{ ministerio.id }}</td>
          <td>{{ ministerio.nome }}</td>
          <td>{{ ministerio.numFuncionarios }}</td>
          <td>{{ ministerio.verba }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="btn-container">
    <button 
      id="btn-edit" 
      @click="editarMinisterio()" 
      :class="{ 'disabled-button': !ministerioSelecionado }"
      :disabled="!ministerioSelecionado"
    >Editar</button>
    
    <button 
      id="btn-delete" 
      @click="excluirMinisterio()" 
      :class="{ 'disabled-button': !ministerioSelecionado }"
      :disabled="!ministerioSelecionado"
    >Excluir</button>
  </div>

  <!-- Formulário de Edição -->
  <div class="form-container" v-if="ministerioSelecionado">
    <h2>Editar Ministério</h2>
    <form @submit.prevent="salvarEdicao">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="ministerioSelecionado.nome" />
      </div>
      <div class="form-group">
        <label for="numFuncionarios">Número de Funcionários:</label>
        <input type="number" id="numFuncionarios" v-model="ministerioSelecionado.numFuncionarios" />
      </div>
      <div class="form-group">
        <label for="verba">Verba:</label>
        <input type="number" id="verba" v-model="ministerioSelecionado.verba" />
      </div>
      <div class="form-actions">
        <button type="submit">Salvar</button>
        <button @click="cancelarEdicao">Cancelar</button>
      </div>
    </form>
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
  name: 'MinisteriosTable',
  props: {
    ministerios: {
      type: Array as () => Ministerio[],
      required: true,
    },
  },
  data() {
    return {
      ministerioSelecionado: null as null | Ministerio, // Armazena o Ministério selecionado
    };
  },
  methods: {
    editarMinisterio(): void {
      // Implemente a lógica para editar o ministério aqui
      // Verifique this.ministerioSelecionado para saber qual ministério está selecionado
    },

    excluirMinisterio(): void {
      // Implemente a lógica para excluir o ministério aqui
      // Verifique this.ministerioSelecionado para saber qual ministério está selecionado
    },

    selecionarMinisterio(ministerio: Ministerio): void {
      // Define o Ministério selecionado
      this.ministerioSelecionado = ministerio;
    },

    salvarEdicao(): void {
      if (this.ministerioSelecionado) {
        // Implemente a lógica para salvar as edições aqui
        // this.ministerioSelecionado contém os dados atualizados
      }
      // Esconde o formulário de edição
      this.ministerioSelecionado = null;
    },

    cancelarEdicao(): void {
      // Esconde o formulário de edição sem salvar
      this.ministerioSelecionado = null;
    },
  },
});
</script>

<style scoped>
  .table-container {
    max-height: 500px; /* Adicione uma barra de rolagem vertical quando necessário */
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    white-space: nowrap; /* Evita que o texto seja quebrado */
    overflow-x: hidden; /* Oculta o texto que estiver fora da célula */
    text-overflow: ellipsis; /* Adiciona reticências (...) ao texto que estiver fora da célula */
    max-width: 300px;
  }

  th {
    background-color: #f2f2f2;
  }

  td:first-child {
    width: 2px;
  }

  td:nth-child(2) {
    width: 48px;
  }

  .btn-container {
    margin-top: 25px;
  }

  button {
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;
    color: #fff;
  }

  #btn-edit {
    background-color: #FCA130;
  }

  #btn-delete {
    background-color: #F93E3E;
  }

  #radio-select {
    cursor: pointer;
  }

  .selected-row {
    background-color: #f0f0f0;
  }

  .disabled-button {
    cursor: not-allowed;
  }

  .form-container {
    display: none;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
  }

  .form-container h2 {
    margin-bottom: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 5px;
  }

  .form-actions {
    margin-top: 15px;
  }

  .form-actions button {
    margin-right: 10px;
  }
</style>
