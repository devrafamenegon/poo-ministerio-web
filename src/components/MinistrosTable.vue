<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Nome</th>
          <th>Partido</th>
          <th>Salário</th>
          <th>Data de Entrada</th>
          <th>Data de Saída</th>
          <th>Ministério ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="ministro in ministros"
          :key="ministro.id"
          :class="{ 'selected-row': ministro === selectedMinistro }"
        >
          <td>
            <input
              type="radio"
              @change="selectTableLine(ministro)"
              :checked="ministro === selectedMinistro"
              :disabled="isCreating"
              :class="{ 'disabled-button': isCreating }"
            />
          </td>
          <td>{{ ministro.id }}</td>
          <td>{{ ministro.nome }}</td>
          <td>{{ ministro.partido }}</td>
          <td>{{ ministro.salario }}</td>
          <td>{{ ministro.dataEntrada }}</td>
          <td>{{ ministro.dataSaida }}</td>
          <td>{{ ministro.ministerioId }}</td>
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
      :class="{ 'disabled-button': !selectedMinistro || isCreating }"
      :disabled="!selectedMinistro || isCreating"
    >Editar</button>
    
    <button 
      id="btn-delete" 
      @click="deleteMinistro" 
      :class="{ 'disabled-button': !selectedMinistro || isCreating }"
      :disabled="!selectedMinistro || isCreating"
    >Excluir</button>
  </div>

  <div class="form-container" v-if="(selectedMinistro !== null) && (isEditing || isCreating)">
    <h2>{{ isCreating ? 'Criar Ministro' : 'Editar Ministro' }}</h2>
    <form @submit.prevent="saveForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="selectedMinistro.nome" />
      </div>
      <div class="form-group">
        <label for="partido">Partido:</label>
        <input type="text" id="partido" v-model="selectedMinistro.partido" />
      </div>
      <div class="form-group">
        <label for="salario">Salário:</label>
        <input type="number" id="salario" v-model="selectedMinistro.salario" />
      </div>
      <div class="form-group">
        <label for="data-entrada">Data de Entrada:</label>
        <input type="date" id="data-entrada" v-model="selectedMinistro.dataEntrada" />
      </div>
      <div class="form-group">
        <label for="data-saida">Data de Saída:</label>
        <input type="date" id="data-saida" v-model="selectedMinistro.dataSaida" />
      </div>
      <div class="form-group">
        <label for="ministerioId">Ministério ID:</label>
        <input type="number" id="ministerioId" v-model="selectedMinistro.ministerioId" />
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
import { api, enpointMinistros } from '@/services/config/httpClient';
import { TYPE, useToast } from "vue-toastification";

interface Ministro {
  id: number;
  nome: string,
  partido: string,
  salario: number,
  dataEntrada: Date,
  dataSaida?: Date,
  ministerioId: number
}

export default defineComponent({
  name: 'MinistrosTable',
  props: {
    ministros: {
      type: Array as () => Ministro[],
      required: true,
    }
  },
  setup() {
   const toast = useToast();
   return { toast }
 },
  data() {
    return {
      selectedMinistro: null as null | Ministro,
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

    selectTableLine(ministro: Ministro): void {
      this.selectedMinistro = ministro;
    },

    create(): void {
      this.isCreating = true;
      this.isEditing = false;
      this.selectedMinistro = {} as Ministro;
    },

    edit(): void {
      this.isEditing = true;
      this.isCreating = false;
    },

    async deleteMinistro(): Promise<void> {
      if (this.selectedMinistro) {
        const secretariaId = this.selectedMinistro.id;

        try {
          const response = await api.delete(`${enpointMinistros}/${secretariaId}`);

          if (response.status === 200) {
            this.triggerToast('Ministro excluído com sucesso.', TYPE.SUCCESS);
          }
        } catch (error) {
          this.triggerToast('Erro inesperado.', TYPE.ERROR);
          console.error('Erro ao excluir o Ministro:', error);
        }
      }

      this.updateTable();
      this.selectedMinistro = null;
    },

    async saveForm(): Promise<void>  {
      if (this.selectedMinistro) {
        if (this.isCreating) {
          try {
            const response = await api.post(`${enpointMinistros}`, this.selectedMinistro);

            if (response.status === 200) {
              this.triggerToast('Ministro criado com sucesso.', TYPE.SUCCESS);
              this.updateTable();
              this.closeForm();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Ministro não pode ser criado pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao criar o ministro:', error);
          }
        }       

        if (this.isEditing) {
          try {
            const response = await api.put(`${enpointMinistros}/${this.selectedMinistro.id}`, this.selectedMinistro);

            if (response.status === 200) {
              this.triggerToast('Ministro editada com sucesso.', TYPE.SUCCESS);
              this.updateTable();
              this.closeForm();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Ministro não pode ser editada pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao atualizar o ministro:', error);
          }
        }
      }
    },

    closeForm(): void {
      this.selectedMinistro = null;
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

  input {
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
