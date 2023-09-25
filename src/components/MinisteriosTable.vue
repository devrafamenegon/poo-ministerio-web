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
        <button id="form-btn-save" type="submit">Salvar</button>
        <button id="form-btn-cancel" @click="cancelarEdicao">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api, enpointMinisterios } from '@/services/config/httpClient';
import { TYPE, useToast } from "vue-toastification";


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
    }
  },
  setup() {
   const toast = useToast();
   return { toast }
 },
  data() {
    return {
      ministerioSelecionado: null as null | Ministerio, // Armazena o Ministério selecionado
    };
  },
  methods: {
    triggerToastSuccess(msg: string) {
      this.toast(msg, {
        type: TYPE.SUCCESS,
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: "omg",
        rtl: false
      });
    },
    editarMinisterio(): void {
      // Implemente a lógica para editar o ministério aqui
      // Verifique this.ministerioSelecionado para saber qual ministério está selecionado
    },

    excluirMinisterio(): void {
      // Implemente a lógica para excluir o ministério aqui
      // Verifique this.ministerioSelecionado para saber qual ministério está selecionado
    },

    selecionarMinisterio(ministerio: Ministerio): void {
      this.ministerioSelecionado = ministerio;
    },

    async salvarEdicao() {
      if (this.ministerioSelecionado) {
        try {
          const response = await api.put(`${enpointMinisterios}/${this.ministerioSelecionado.id}`, this.ministerioSelecionado);

          if (response.status === 200) {
            this.triggerToastSuccess('Ministério salvo com sucesso.')
          } else {
            console.log('Falha ao atualizar Ministério.');
          }
        } catch (error) {
          console.error('Erro ao atualizar o ministério:', error);
        }
      }
      this.ministerioSelecionado = null;
    },

    cancelarEdicao(): void {
      // Esconde o formulário de edição sem salvar
      this.ministerioSelecionado = null;
    },
  }
});
</script>

<style scoped>
  .table-container {
    margin-top: 20px;
    max-height: 350px; /* Adicione uma barra de rolagem vertical quando necessário */
    overflow-y: auto;
    border: 1px solid #ccc;
  }

  table {
    width: 100%;
    border-collapse: collapse;
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
    max-height: 250px;
    overflow-y: auto;
    margin-top: 24px;
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  .form-container h2 {
    font-weight: 600;
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="number"] {
    border: 1px solid #ccc;
    padding: 3px;
  }

  .form-actions {
    margin-top: 15px;
  }

  .form-actions button {
    margin-right: 10px;
  }

  #form-btn-save {
    background-color: #49CC8E;
  }

  #form-btn-cancel {
    background-color: #b6b6b6;
  }
</style>
