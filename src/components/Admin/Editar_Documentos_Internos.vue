<template>
  <div class="editar-documentos-container">
    <h2>📝 Editar Documentos</h2>
    
    <div class="search-section">
      <div class="search-box">
        <label for="documentoId">ID del Documento:</label>
        <input 
          id="documentoId" 
          type="number" 
          v-model="documentoId" 
          placeholder="Ingrese el ID del documento"
          @keyup.enter="buscarDocumento"
        />
        <button @click="buscarDocumento" class="btn btn-primary">🔍 Buscar</button>
      </div>
    </div>

    <div v-if="documentoEncontrado" class="form-section">
      <form @submit.prevent="guardarCambios" class="edit-form">
        <div class="form-group">
          <label>ID Documento:</label>
          <input type="text" :value="documentoEncontrado.id" disabled />
        </div>

        <div class="form-group">
          <label>Nombre del Documento:</label>
          <input 
            type="text" 
            v-model="formData.nombreDocumento" 
            required
            placeholder="Ingrese el nombre del documento"
          />
        </div>

        <div class="form-group">
          <label>Categoría:</label>
          <select v-model="formData.categoria" required>
            <option value="">Seleccione una categoría</option>
            <option value="manual">Manual</option>
            <option value="procedimiento">Procedimiento</option>
            <option value="politica">Política</option>
            <option value="formulario">Formulario</option>
            <option value="reporte">Reporte</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label>Descripción:</label>
          <textarea 
            v-model="formData.descripcion" 
            rows="4"
            placeholder="Ingrese una descripción del documento"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Fecha de Vencimiento:</label>
          <input 
            type="date" 
            v-model="formData.fechaVencimiento"
          />
        </div>

        <div class="form-group">
          <label>Estado:</label>
          <select v-model="formData.estado" required>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="archivado">Archivado</option>
          </select>
        </div>

        <div class="file-section">
          <label>Archivo Actual:</label>
          <div class="current-file">
            <span>📄 {{ documentoEncontrado.nombreArchivo || 'documento.pdf' }}</span>
            <button type="button" @click="reemplazarArchivo" class="btn btn-sm btn-warning">
              🔄 Reemplazar Archivo
            </button>
          </div>
          <input 
            type="file" 
            ref="fileInput"
            @change="handleFileSelect"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            style="display: none;"
          />
          <div v-if="nuevoArchivo" class="new-file-info">
            <p>Nuevo archivo seleccionado: <strong>{{ nuevoArchivo.name }}</strong></p>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-success">💾 Guardar Cambios</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">🔄 Cancelar</button>
        </div>
      </form>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>

    <div v-if="!documentoEncontrado && documentoId" class="no-document">
      <p>📝 Documento no encontrado</p>
      <p>Esta funcionalidad está en desarrollo. Los documentos aparecerán aquí cuando esté completamente implementado.</p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Editar_Documentos_Internos',
  data() {
    return {
      documentoId: '',
      documentoEncontrado: null,
      nuevoArchivo: null,
      formData: {
        nombreDocumento: '',
        categoria: '',
        descripcion: '',
        fechaVencimiento: '',
        estado: 'activo'
      },
      error: '',
      success: ''
    };
  },
  methods: {
    buscarDocumento() {
      if (!this.documentoId) {
        Swal.fire('Error', 'Por favor ingrese un ID de documento', 'error');
        return;
      }

      // Simulación de búsqueda (funcionalidad estática)
      this.documentoEncontrado = {
        id: this.documentoId,
        nombreDocumento: 'Manual de Usuario',
        categoria: 'manual',
        descripcion: 'Guía completa para usuarios del sistema',
        fechaVencimiento: '2025-12-31',
        estado: 'activo',
        nombreArchivo: 'manual_usuario.pdf'
      };

      this.formData = {
        nombreDocumento: this.documentoEncontrado.nombreDocumento,
        categoria: this.documentoEncontrado.categoria,
        descripcion: this.documentoEncontrado.descripcion,
        fechaVencimiento: this.documentoEncontrado.fechaVencimiento,
        estado: this.documentoEncontrado.estado
      };
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.nuevoArchivo = file;
      }
    },
    reemplazarArchivo() {
      this.$refs.fileInput.click();
    },
    async guardarCambios() {
      if (!this.documentoEncontrado) {
        Swal.fire('Error', 'Debe buscar un documento primero', 'error');
        return;
      }

      // Simulación de guardado (funcionalidad estática)
      Swal.fire({
        icon: 'info',
        title: 'Funcionalidad en Desarrollo',
        text: 'La edición de documentos está en desarrollo. Los cambios se guardarán cuando la funcionalidad esté completamente implementada.',
        showConfirmButton: true
      });

      this.success = 'Cambios preparados para guardar (funcionalidad en desarrollo)';
    },
    resetForm() {
      this.documentoEncontrado = null;
      this.documentoId = '';
      this.nuevoArchivo = null;
      this.formData = {
        nombreDocumento: '',
        categoria: '',
        descripcion: '',
        fechaVencimiento: '',
        estado: 'activo'
      };
      this.error = '';
      this.success = '';
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    }
  }
};
</script>

<style scoped>
.editar-documentos-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.search-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box label {
  min-width: 150px;
  font-weight: bold;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-section {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.form-group textarea {
  resize: vertical;
}

.file-section {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.file-section label {
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
  display: block;
}

.current-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
}

.new-file-info {
  padding: 10px;
  background: #e7f3ff;
  border-radius: 4px;
  color: #0066cc;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-warning {
  background: #ffc107;
  color: #333;
}

.btn-warning:hover {
  background: #e0a800;
}

.alert {
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.no-document {
  text-align: center;
  padding: 40px;
  color: #999;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.no-document p {
  margin: 10px 0;
}
</style>

