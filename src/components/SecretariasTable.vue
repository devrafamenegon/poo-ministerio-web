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
          <th>Ministério ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="secretaria in secretarias"
          :key="secretaria.id"
          :class="{ 'selected-row': secretaria === selectedSecretaria }"
        >
          <td>
            <input
              type="radio"
              @change="selectTableLine(secretaria)"
              :checked="secretaria === selectedSecretaria"
              :disabled="isCreating"
              :class="{ 'disabled-button': isCreating }"
            />
          </td>
          <td>{{ secretaria.id }}</td>
          <td>{{ secretaria.nome }}</td>
          <td>{{ secretaria.numFuncionarios }}</td>
          <td>{{ secretaria.verba }}</td>
          <td>{{ secretaria.ministerioId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="btn-container">
    <button 
      id="btn-create" 
      @click="create()"
    >Criar</button>

    <button 
      id="btn-edit" 
      @click="edit()" 
      :class="{ 'disabled-button': !selectedSecretaria || isCreating }"
      :disabled="!selectedSecretaria || isCreating"
    >Editar</button>
    
    <button 
      id="btn-delete" 
      @click="deleteSecretaria" 
      :class="{ 'disabled-button': !selectedSecretaria || isCreating }"
      :disabled="!selectedSecretaria || isCreating"
    >Excluir</button>
  </div>

  <div class="form-container" v-if="(selectedSecretaria !== null) && (isEditing || isCreating)">
    <h2>{{ isCreating ? 'Criar Secretaría' : 'Editar Secretaría' }}</h2>
    <form @submit.prevent="saveForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="selectedSecretaria.nome" />
      </div>
      <div class="form-group">
        <label for="numFuncionarios">Número de Funcionários:</label>
        <input type="number" id="numFuncionarios" v-model="selectedSecretaria.numFuncionarios" />
      </div>
      <div class="form-group">
        <label for="verba">Verba:</label>
        <input type="number" id="verba" v-model="selectedSecretaria.verba" />
      </div>
      <div class="form-group">
        <label for="ministerioId">MInistério ID:</label>
        <input type="number" id="ministerioId" v-model="selectedSecretaria.ministerioId" />
      </div>
      <div class="form-actions">
        <button id="form-btn-save" type="submit">{{ isCreating ? 'Criar' : 'Salvar' }}</button>
        <button id="form-btn-cancel" @click="closeForm">Cancelar</button>
      </div>
    </form>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api, enpointSecretarias } from '@/services/config/httpClient';
import { TYPE, useToast } from "vue-toastification";

interface Secretaria {
  id: number;
  nome: string;
  numFuncionarios: number;
  verba: number;
  ministerioId: number;
}

export default defineComponent({
  name: 'SecreatariasTable',
  props: {
    secretarias: {
      type: Array as () => Secretaria[],
      required: true,
    }
  },
  setup() {
   const toast = useToast();
   return { toast }
 },
  data() {
    return {
      selectedSecretaria: null as null | Secretaria,
      isEditing: false,
      isCreating: false,
      errorMessage: '',
    };
  },
  methods: {
    triggerToast(msg: string, type: TYPE): void {
      this.toast(msg, {
        type: type,
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        rtl: false
      });
    },

    updateTable(): void {
      // Se você estiver usando Vue 3, você pode emitir um evento para o componente pai para atualizar a lista
      this.$emit('update')
    },

    selectTableLine(secretaria: Secretaria): void {
      this.selectedSecretaria = secretaria;
    },

    create(): void {
      this.isCreating = true;
      this.isEditing = false;
      this.selectedSecretaria = {} as Secretaria;
    },

    edit(): void {
      this.isEditing = true;
      this.isCreating = false;
    },

    async deleteSecretaria(): Promise<void> {
      if (this.selectedSecretaria) {
        const secretariaId = this.selectedSecretaria.id;

        try {
          const response = await api.delete(`${enpointSecretarias}/${secretariaId}`);

          if (response.status === 200) {
            this.triggerToast('Secretaría excluída com sucesso.', TYPE.SUCCESS);
          }
        } catch (error) {
          this.triggerToast('Erro inesperado.', TYPE.ERROR);
          console.error('Erro ao excluir a Secretaría:', error);
        }
      }

      this.updateTable();
      this.selectedSecretaria = null;
    },

    async saveForm(): Promise<void>  {
      if (this.selectedSecretaria) {
        if (this.isCreating) {
          try {
            const response = await api.post(`${enpointSecretarias}`, this.selectedSecretaria);

            if (response.status === 200) {
              this.triggerToast('Secretaría criado com sucesso.', TYPE.SUCCESS);
              this.updateTable();
              this.closeForm();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Secretaría não pode ser criada pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao criar o secretaría:', error);
          }
        }       

        if (this.isEditing) {
          try {
            const response = await api.put(`${enpointSecretarias}/${this.selectedSecretaria.id}`, this.selectedSecretaria);

            if (response.status === 200) {
              this.triggerToast('Secretaría editada com sucesso.', TYPE.SUCCESS);
              this.updateTable();
              this.closeForm();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Secretaría não pode ser editada pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao atualizar o secretaría:', error);
          }
        }
      }
    },

    closeForm(): void {
      this.selectedSecretaria = null;
      this.errorMessage = '';
      this.isEditing = false;
      this.isCreating = false;
      this.updateTable();
    },
  }
});
</script>

<style scoped>
  .table-container {
    margin-top: 20px;
    max-height: 350px;
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

  #btn-create {
    background-color: #49CC8E;
  }

  #btn-edit {
    background-color: #FCA130;
  }

  #btn-delete {
    background-color: #F93E3E;
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
