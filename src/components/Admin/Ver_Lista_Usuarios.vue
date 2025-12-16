<template>
  <div class="lista-usuarios-container">
    <h2>👥 Ver Lista de Usuarios</h2>
    
    <div class="tabs">
      <button 
        @click="tabActivo = 'admins'" 
        :class="['tab', { active: tabActivo === 'admins' }]"
      >
        👨‍💼 Administradores
      </button>
      <button 
        @click="tabActivo = 'clientes'" 
        :class="['tab', { active: tabActivo === 'clientes' }]"
      >
        👤 Clientes
      </button>
    </div>

    <div class="filters">
      <input 
        type="text" 
        v-model="filtroBusqueda" 
        placeholder="🔍 Buscar por correo o ID..."
        class="search-input"
      />
      <button @click="cargarUsuarios" class="btn btn-primary">🔄 Actualizar</button>
    </div>

    <div v-if="cargando" class="loading">
      <p>Cargando usuarios...</p>
    </div>

    <div v-else>
      <!-- Tabla de Administradores -->
      <div v-if="tabActivo === 'admins'" class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="adminsFiltrados.length === 0">
              <td colspan="5" class="no-data">No hay administradores registrados</td>
            </tr>
            <tr v-for="admin in adminsFiltrados" :key="admin.idAdmin">
              <td>{{ admin.idAdmin }}</td>
              <td>{{ admin.correo || 'N/A' }}</td>
              <td>
                <span class="badge badge-info">{{ admin.rol?.rol || 'Sin rol' }}</span>
              </td>
              <td>
                <span :class="['badge', admin.estadoCuenta === false ? 'badge-danger' : 'badge-success']">
                  {{ admin.estadoCuenta === false ? '🚫 Bloqueado' : '✅ Activo' }}
                </span>
              </td>
              <td>
                <button 
                  @click="verDetalleAdmin(admin.idAdmin)" 
                  class="btn btn-sm btn-info"
                >
                  👁️ Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Tabla de Clientes -->
      <div v-if="tabActivo === 'clientes'" class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Correo</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="clientesFiltrados.length === 0">
              <td colspan="5" class="no-data">No hay clientes registrados</td>
            </tr>
            <tr v-for="cliente in clientesFiltrados" :key="cliente.idCliente">
              <td>{{ cliente.idCliente }}</td>
              <td>{{ cliente.correo || 'N/A' }}</td>
              <td>
                {{ cliente.persona?.nombre || 'N/A' }} 
                {{ cliente.persona?.apellidoP || '' }} 
                {{ cliente.persona?.apellidoM || '' }}
              </td>
              <td>
                <span :class="['badge', cliente.estadoCuenta === false ? 'badge-danger' : 'badge-success']">
                  {{ cliente.estadoCuenta === false ? '🚫 Bloqueado' : '✅ Activo' }}
                </span>
              </td>
              <td>
                <button 
                  @click="verDetalleCliente(cliente.idCliente)" 
                  class="btn btn-sm btn-info"
                >
                  👁️ Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Detalle -->
    <div v-if="mostrarDetalle" class="modal-overlay" @click="cerrarDetalle">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Detalles del Usuario</h3>
          <button @click="cerrarDetalle" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div v-if="detalleUsuario" class="detalle-info">
            <div class="info-item" v-for="(value, key) in detalleUsuario" :key="key">
              <strong>{{ formatKey(key) }}:</strong> 
              <span>{{ formatValue(value) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';

export default {
  name: 'Ver_Lista_Usuarios',
  data() {
    return {
      tabActivo: 'admins',
      admins: [],
      clientes: [],
      filtroBusqueda: '',
      cargando: false,
      mostrarDetalle: false,
      detalleUsuario: null
    };
  },
  computed: {
    adminsFiltrados() {
      if (!this.filtroBusqueda) return this.admins;
      const filtro = this.filtroBusqueda.toLowerCase();
      return this.admins.filter(admin => 
        admin.correo?.toLowerCase().includes(filtro) ||
        String(admin.idAdmin).includes(filtro)
      );
    },
    clientesFiltrados() {
      if (!this.filtroBusqueda) return this.clientes;
      const filtro = this.filtroBusqueda.toLowerCase();
      return this.clientes.filter(cliente => 
        cliente.correo?.toLowerCase().includes(filtro) ||
        String(cliente.idCliente).includes(filtro) ||
        cliente.persona?.nombre?.toLowerCase().includes(filtro)
      );
    }
  },
  mounted() {
    this.cargarUsuarios();
  },
  methods: {
    async cargarUsuarios() {
      this.cargando = true;
      try {
        const [adminsRes, clientesRes] = await Promise.all([
          axios.get(`${API_URL}/admin`),
          axios.get(`${API_URL}/cliente/clientes`)
        ]);
        
        this.admins = adminsRes.data.result || [];
        this.clientes = clientesRes.data.result || [];
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        this.cargando = false;
      }
    },
    async verDetalleAdmin(id) {
      try {
        const response = await axios.get(`${API_URL}/admin/${id}`);
        this.detalleUsuario = response.data.result;
        this.mostrarDetalle = true;
      } catch (error) {
        console.error('Error al obtener detalle:', error);
      }
    },
    async verDetalleCliente(id) {
      try {
        const response = await axios.get(`${API_URL}/cliente/${id}`);
        this.detalleUsuario = response.data.result;
        this.mostrarDetalle = true;
      } catch (error) {
        console.error('Error al obtener detalle:', error);
      }
    },
    cerrarDetalle() {
      this.mostrarDetalle = false;
      this.detalleUsuario = null;
    },
    formatKey(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    },
    formatValue(value) {
      if (value === null || value === undefined) return 'N/A';
      if (typeof value === 'object') return JSON.stringify(value);
      return value;
    }
  }
};
</script>

<style scoped>
.lista-usuarios-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.tab {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  transition: all 0.3s;
}

.tab.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #007bff;
  color: white;
}

.data-table th {
  padding: 15px;
  text-align: left;
  font-weight: bold;
}

.data-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badge-info {
  background: #17a2b8;
  color: white;
}

.badge-success {
  background: #28a745;
  color: white;
}

.badge-danger {
  background: #dc3545;
  color: white;
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

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
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
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
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
}

.detalle-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item strong {
  display: inline-block;
  min-width: 150px;
  color: #555;
}
</style>
