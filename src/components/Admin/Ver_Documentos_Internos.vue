<template>
  <div class="ver-documentos-container">
    <h2>📂 Ver Documentos</h2>
    
    <div class="filters-section">
      <div class="filters">
        <div class="filter-group">
          <label>Buscar:</label>
          <input 
            type="text" 
            v-model="filtroBusqueda" 
            placeholder="Buscar por nombre, categoría o descripción..."
            class="search-input"
          />
        </div>
        <div class="filter-group">
          <label>Categoría:</label>
          <select v-model="filtroCategoria">
            <option value="">Todas</option>
            <option value="manual">Manual</option>
            <option value="procedimiento">Procedimiento</option>
            <option value="politica">Política</option>
            <option value="formulario">Formulario</option>
            <option value="reporte">Reporte</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Ordenar por:</label>
          <select v-model="ordenarPor">
            <option value="fecha">Fecha de Subida</option>
            <option value="nombre">Nombre</option>
            <option value="categoria">Categoría</option>
          </select>
        </div>
        <button @click="aplicarFiltros" class="btn btn-primary">🔍 Buscar</button>
        <button @click="limpiarFiltros" class="btn btn-secondary">🔄 Limpiar</button>
      </div>
    </div>

    <div class="documents-section">
      <div class="documents-grid">
        <div 
          v-for="(doc, index) in documentosFiltrados" 
          :key="index" 
          class="document-card"
        >
          <div class="document-icon">
            <span v-if="doc.tipo === 'pdf'">📄</span>
            <span v-else-if="doc.tipo === 'word'">📝</span>
            <span v-else-if="doc.tipo === 'excel'">📊</span>
            <span v-else>📁</span>
          </div>
          <div class="document-info">
            <h4>{{ doc.nombre }}</h4>
            <p class="document-category">{{ doc.categoria }}</p>
            <p class="document-description">{{ doc.descripcion || 'Sin descripción' }}</p>
            <div class="document-meta">
              <span>📅 {{ doc.fecha }}</span>
              <span>👤 {{ doc.subidoPor }}</span>
            </div>
          </div>
          <div class="document-actions">
            <button @click="verDocumento(doc)" class="btn btn-sm btn-info">👁️ Ver</button>
            <button @click="descargarDocumento(doc)" class="btn btn-sm btn-success">⬇️ Descargar</button>
          </div>
        </div>
      </div>

      <div v-if="documentosFiltrados.length === 0" class="no-documents">
        <p>📝 No se encontraron documentos</p>
        <p>Esta funcionalidad está en desarrollo. Los documentos aparecerán aquí cuando esté completamente implementado.</p>
      </div>
    </div>

    <!-- Modal de Vista Previa -->
    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ documentoSeleccionado?.nombre }}</h3>
          <button @click="cerrarModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="document-preview">
            <p>📄 Vista previa del documento</p>
            <p class="preview-note">La funcionalidad de vista previa está en desarrollo.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="descargarDocumento(documentoSeleccionado)" class="btn btn-success">
            ⬇️ Descargar
          </button>
          <button @click="cerrarModal" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Ver_Documentos_Internos',
  data() {
    return {
      filtroBusqueda: '',
      filtroCategoria: '',
      ordenarPor: 'fecha',
      mostrarModal: false,
      documentoSeleccionado: null,
      // Datos de ejemplo (estáticos)
      documentos: [
        {
          id: 1,
          nombre: 'Manual de Usuario',
          categoria: 'Manual',
          descripcion: 'Guía completa para usuarios del sistema',
          fecha: '2024-01-15',
          subidoPor: 'Admin',
          tipo: 'pdf'
        },
        {
          id: 2,
          nombre: 'Procedimiento de Facturación',
          categoria: 'Procedimiento',
          descripcion: 'Proceso detallado para generar facturas',
          fecha: '2024-01-20',
          subidoPor: 'Admin',
          tipo: 'word'
        }
      ]
    };
  },
  computed: {
    documentosFiltrados() {
      let docs = [...this.documentos];
      
      // Filtro por búsqueda
      if (this.filtroBusqueda) {
        const busqueda = this.filtroBusqueda.toLowerCase();
        docs = docs.filter(doc => 
          doc.nombre.toLowerCase().includes(busqueda) ||
          doc.categoria.toLowerCase().includes(busqueda) ||
          (doc.descripcion && doc.descripcion.toLowerCase().includes(busqueda))
        );
      }
      
      // Filtro por categoría
      if (this.filtroCategoria) {
        docs = docs.filter(doc => doc.categoria === this.filtroCategoria);
      }
      
      // Ordenar
      if (this.ordenarPor === 'fecha') {
        docs.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      } else if (this.ordenarPor === 'nombre') {
        docs.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (this.ordenarPor === 'categoria') {
        docs.sort((a, b) => a.categoria.localeCompare(b.categoria));
      }
      
      return docs;
    }
  },
  methods: {
    aplicarFiltros() {
      // Los filtros se aplican automáticamente mediante computed
      console.log('Filtros aplicados');
    },
    limpiarFiltros() {
      this.filtroBusqueda = '';
      this.filtroCategoria = '';
      this.ordenarPor = 'fecha';
    },
    verDocumento(doc) {
      this.documentoSeleccionado = doc;
      this.mostrarModal = true;
    },
    descargarDocumento(doc) {
      Swal.fire({
        icon: 'info',
        title: 'Funcionalidad en Desarrollo',
        text: `La descarga del documento "${doc.nombre}" estará disponible cuando la funcionalidad esté completamente implementada.`,
        showConfirmButton: true
      });
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.documentoSeleccionado = null;
    }
  }
};
</script>

<style scoped>
.ver-documentos-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.filters-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-weight: bold;
  color: #555;
}

.filter-group input,
.filter-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  min-width: 300px;
}

.documents-section {
  margin-bottom: 30px;
}

.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.document-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}

.document-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.document-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 15px;
}

.document-info {
  flex: 1;
  margin-bottom: 15px;
}

.document-info h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
}

.document-category {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 10px;
}

.document-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  min-height: 40px;
}

.document-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  color: #999;
}

.document-actions {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.no-documents {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.no-documents p {
  margin: 10px 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.document-preview {
  text-align: center;
  padding: 40px;
}

.preview-note {
  color: #999;
  font-style: italic;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #ddd;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
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
</style>
