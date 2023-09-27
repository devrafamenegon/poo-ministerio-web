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
              @change="selecionarMinisterio(ministerio)"
              :checked="ministerio === ministerioSelecionado"
              :disabled="isCreating"
              :class="{ 'disabled-button': isCreating }"
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
      id="btn-create" 
      @click="criarMinisterio()"
    >Criar</button>

    <button 
      id="btn-edit" 
      @click="editarMinisterio()" 
      :class="{ 'disabled-button': !ministerioSelecionado || isCreating }"
      :disabled="!ministerioSelecionado || isCreating"
    >Editar</button>
    
    <button 
      id="btn-delete" 
      @click="excluirMinisterio()" 
      :class="{ 'disabled-button': !ministerioSelecionado || isCreating }"
      :disabled="!ministerioSelecionado || isCreating"
    >Excluir</button>
  </div>

  <div class="form-container" v-if="(ministerioSelecionado !== null) && (isEditing || isCreating)">
    <h2>{{ isCreating ? 'Criar Ministério' : 'Editar Ministério' }}</h2>
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
        <button id="form-btn-save" type="submit">{{ isCreating ? 'Criar' : 'Salvar' }}</button>
        <button id="form-btn-cancel" @click="cancelarEdicao">Cancelar</button>
      </div>
    </form>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
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
      ministerioSelecionado: null as null | Ministerio,
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
        icon: "omg",
        rtl: false
      });
    },

    atualizarLista(): void {
      // Se você estiver usando Vue 3, você pode emitir um evento para o componente pai para atualizar a lista
      this.$emit('atualizar-lista')
    },

    selecionarMinisterio(ministerio: Ministerio): void {
      this.ministerioSelecionado = ministerio;
    },

    criarMinisterio(): void {
      this.isCreating = true;
      this.isEditing = false;
      this.ministerioSelecionado = {} as Ministerio;
    },

    editarMinisterio(): void {
      this.isEditing = true;
    },

    async excluirMinisterio(): Promise<void> {
      if (this.ministerioSelecionado) {
        const ministerioId = this.ministerioSelecionado.id;

        try {
          const response = await api.delete(`${enpointMinisterios}/${ministerioId}`);

          if (response.status === 200) {
            this.triggerToast('Ministério excluído com sucesso.', TYPE.SUCCESS);
          } else {
            this.triggerToast('Ministério não pode ser excluído pois possui secretária(s) cadastrada(s).', TYPE.ERROR);
          }
        } catch (error) {
          this.triggerToast('Erro inesperado.', TYPE.ERROR);
          console.error('Erro ao excluir o Ministério:', error);
        }
      }

      this.atualizarLista();
      this.ministerioSelecionado = null;
    },

    async salvarEdicao(): Promise<void>  {
      if (this.ministerioSelecionado) {
        if (this.isCreating) {
          try {
            const response = await api.post(`${enpointMinisterios}`, this.ministerioSelecionado);

            if (response.status === 200) {
              this.triggerToast('Ministério criado com sucesso.', TYPE.SUCCESS);
              this.atualizarLista();
              this.cancelarEdicao();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Ministério não pode ser criado pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao criar o ministério:', error);
          }
        }       

        if (this.isEditing) {
          try {
            const response = await api.put(`${enpointMinisterios}/${this.ministerioSelecionado.id}`, this.ministerioSelecionado);

            if (response.status === 200) {
              this.triggerToast('Ministério editado com sucesso.', TYPE.SUCCESS);
              this.atualizarLista();
              this.cancelarEdicao();
            } 

            // TODO - se não é 200, cai direto no catch
            if (response.status === 400){
              this.errorMessage = response.data.message;
              this.triggerToast('Ministério não pode ser editado pois possui campos inválidos.', TYPE.ERROR);
            }

          } catch (error) {
            this.triggerToast('Erro inesperado.', TYPE.ERROR);
            console.error('Erro ao atualizar o ministério:', error);
          }
        }
      }
    },

    cancelarEdicao(): void {
      this.ministerioSelecionado = null;
      this.errorMessage = '';
      this.isEditing = false;
      this.isCreating = false;
      this.atualizarLista();
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
