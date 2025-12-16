<template>
  <div class="subir-documentos-container">
    <h2>📤 Subir Documentos</h2>
    
    <div class="upload-section">
      <div class="upload-card">
        <h3>📁 Seleccionar Documento</h3>
        <div class="upload-area">
          <input 
            type="file" 
            id="fileInput" 
            ref="fileInput"
            @change="handleFileSelect"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            style="display: none;"
          />
          <div 
            class="drop-zone" 
            @click="$refs.fileInput.click()"
            @dragover.prevent
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': isDragging }"
          >
            <div class="upload-icon">📄</div>
            <p>Haga clic para seleccionar o arrastre un archivo aquí</p>
            <p class="file-info" v-if="archivoSeleccionado">
              Archivo seleccionado: <strong>{{ archivoSeleccionado.name }}</strong>
              ({{ formatFileSize(archivoSeleccionado.size) }})
            </p>
          </div>
        </div>

        <div class="form-section">
          <div class="form-group">
            <label for="nombreDocumento">Nombre del Documento:</label>
            <input 
              id="nombreDocumento" 
              type="text" 
              v-model="formData.nombreDocumento" 
              placeholder="Ingrese el nombre del documento"
              required
            />
          </div>

          <div class="form-group">
            <label for="categoria">Categoría:</label>
            <select id="categoria" v-model="formData.categoria" required>
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
            <label for="descripcion">Descripción:</label>
            <textarea 
              id="descripcion" 
              v-model="formData.descripcion" 
              rows="4"
              placeholder="Ingrese una descripción del documento"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="fechaVencimiento">Fecha de Vencimiento (opcional):</label>
            <input 
              id="fechaVencimiento" 
              type="date" 
              v-model="formData.fechaVencimiento"
            />
          </div>

          <div class="form-actions">
            <button @click="subirDocumento" class="btn btn-success" :disabled="!archivoSeleccionado">
              📤 Subir Documento
            </button>
            <button @click="limpiarFormulario" class="btn btn-secondary">🔄 Limpiar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>

    <div class="info-box">
      <p>ℹ️ <strong>Nota:</strong> Esta funcionalidad está en desarrollo. Los documentos se almacenarán en el sistema cuando esté completamente implementado.</p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Subir_Documentos_Internos',
  data() {
    return {
      archivoSeleccionado: null,
      isDragging: false,
      formData: {
        nombreDocumento: '',
        categoria: '',
        descripcion: '',
        fechaVencimiento: ''
      },
      error: '',
      success: ''
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.archivoSeleccionado = file;
      }
    },
    handleDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.archivoSeleccionado = file;
      }
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },
    async subirDocumento() {
      if (!this.archivoSeleccionado) {
        Swal.fire('Error', 'Por favor seleccione un archivo', 'error');
        return;
      }

      if (!this.formData.nombreDocumento || !this.formData.categoria) {
        Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
        return;
      }

      // Simulación de subida (funcionalidad estática)
      Swal.fire({
        icon: 'info',
        title: 'Funcionalidad en Desarrollo',
        text: 'La funcionalidad de subida de documentos está en desarrollo. En el futuro, los documentos se almacenarán en el sistema.',
        showConfirmButton: true
      });

      this.success = 'Documento preparado para subir (funcionalidad en desarrollo)';
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.archivoSeleccionado = null;
      this.formData = {
        nombreDocumento: '',
        categoria: '',
        descripcion: '',
        fechaVencimiento: ''
      };
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.subir-documentos-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.upload-section {
  margin-bottom: 30px;
}

.upload-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.upload-card h3 {
  color: #555;
  margin-bottom: 20px;
}

.upload-area {
  margin-bottom: 30px;
}

.drop-zone {
  border: 3px dashed #007bff;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: #f8f9fa;
}

.drop-zone:hover {
  background: #e7f3ff;
  border-color: #0056b3;
}

.drop-zone.drag-over {
  background: #d4edda;
  border-color: #28a745;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.drop-zone p {
  margin: 10px 0;
  color: #666;
}

.file-info {
  margin-top: 15px;
  padding: 10px;
  background: #e7f3ff;
  border-radius: 4px;
  color: #0066cc;
}

.form-section {
  margin-top: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
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

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #218838;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
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

.info-box {
  background: #d1ecf1;
  border: 1px solid #bee5eb;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
  color: #0c5460;
}
</style>
