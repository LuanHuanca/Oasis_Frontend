<template>
  <div class="desactivar-usuario-container">
    <h2>🚫 Desactivar Usuario</h2>
    
    <div class="search-section">
      <div class="search-box">
        <label for="searchType">Tipo de Usuario:</label>
        <select id="searchType" v-model="searchType" @change="resetForm">
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>
      
      <div class="search-box">
        <label for="userId">ID del Usuario:</label>
        <input 
          id="userId" 
          type="number" 
          v-model="userId" 
          placeholder="Ingrese el ID"
          @keyup.enter="buscarUsuario"
        />
        <button @click="buscarUsuario" class="btn btn-primary">🔍 Buscar</button>
      </div>
    </div>

    <div v-if="usuarioEncontrado" class="user-info-section">
      <div class="user-card">
        <h3>Información del Usuario</h3>
        <div class="user-details">
          <div class="detail-item">
            <strong>ID:</strong> 
            <span>{{ searchType === 'admin' ? usuarioEncontrado.idAdmin : usuarioEncontrado.idCliente }}</span>
          </div>
          <div class="detail-item">
            <strong>Correo:</strong> 
            <span>{{ usuarioEncontrado.correo || 'N/A' }}</span>
          </div>
          <div v-if="searchType === 'admin'" class="detail-item">
            <strong>Rol:</strong> 
            <span>{{ usuarioEncontrado.rol?.rol || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <strong>Estado:</strong> 
            <span :class="usuarioEncontrado.estadoCuenta === false ? 'status-bloqueado' : 'status-activo'">
              {{ usuarioEncontrado.estadoCuenta === false ? '🚫 Bloqueado' : '✅ Activo' }}
            </span>
          </div>
          <div v-if="usuarioEncontrado.estadoCuenta === false && usuarioEncontrado.motivoBloqueo" class="detail-item">
            <strong>Motivo de Bloqueo:</strong> 
            <span class="motivo-bloqueo">{{ usuarioEncontrado.motivoBloqueo }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button 
            v-if="usuarioEncontrado.estadoCuenta !== false" 
            @click="bloquearUsuario" 
            class="btn btn-danger"
          >
            🚫 Bloquear Usuario
          </button>
          <button 
            v-if="usuarioEncontrado.estadoCuenta === false" 
            @click="desbloquearUsuario" 
            class="btn btn-success"
          >
            ✅ Desbloquear Usuario
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Swal from 'sweetalert2';

export default {
  name: 'Desactivar_Usuario',
  data() {
    return {
      searchType: 'admin',
      userId: '',
      usuarioEncontrado: null,
      error: '',
      success: ''
    };
  },
  methods: {
    async buscarUsuario() {
      if (!this.userId) {
        Swal.fire('Error', 'Por favor ingrese un ID de usuario', 'error');
        return;
      }

      this.error = '';
      this.success = '';
      this.usuarioEncontrado = null;

      try {
        if (this.searchType === 'admin') {
          const response = await axios.get(`${API_URL}/admin/${this.userId}`);
          this.usuarioEncontrado = response.data.result;
        } else {
          const response = await axios.get(`${API_URL}/cliente/${this.userId}`);
          this.usuarioEncontrado = response.data.result;
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Usuario no encontrado';
        Swal.fire('Error', this.error, 'error');
      }
    },
    async bloquearUsuario() {
      const result = await Swal.fire({
        title: '¿Está seguro?',
        html: `
          <p>¿Desea bloquear este usuario?</p>
          <p><strong>ID:</strong> ${this.searchType === 'admin' ? this.usuarioEncontrado.idAdmin : this.usuarioEncontrado.idCliente}</p>
          <p><strong>Correo:</strong> ${this.usuarioEncontrado.correo}</p>
          <input id="motivo" class="swal2-input" placeholder="Motivo del bloqueo (opcional)">
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, bloquear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        preConfirm: () => {
          const motivo = document.getElementById('motivo').value;
          return motivo || 'Bloqueado manualmente';
        }
      });

      if (result.isConfirmed) {
        try {
          const motivo = result.value;
          
          if (this.searchType === 'admin') {
            await axios.post(`${API_URL}/bloqueo/admin/${this.usuarioEncontrado.idAdmin}/bloquear`, {
              motivo: motivo
            });
          } else {
            await axios.post(`${API_URL}/bloqueo/cliente/${this.usuarioEncontrado.idCliente}/bloquear`, {
              motivo: motivo
            });
          }

          Swal.fire('Éxito', 'Usuario bloqueado correctamente', 'success');
          this.success = 'Usuario bloqueado correctamente';
          await this.buscarUsuario(); // Recargar información
        } catch (error) {
          this.error = error.response?.data?.message || 'Error al bloquear el usuario';
          Swal.fire('Error', this.error, 'error');
        }
      }
    },
    async desbloquearUsuario() {
      const result = await Swal.fire({
        title: '¿Está seguro?',
        html: `
          <p>¿Desea desbloquear este usuario?</p>
          <p><strong>ID:</strong> ${this.searchType === 'admin' ? this.usuarioEncontrado.idAdmin : this.usuarioEncontrado.idCliente}</p>
          <p><strong>Correo:</strong> ${this.usuarioEncontrado.correo}</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, desbloquear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745'
      });

      if (result.isConfirmed) {
        try {
          if (this.searchType === 'admin') {
            await axios.post(`${API_URL}/bloqueo/admin/${this.usuarioEncontrado.idAdmin}/desbloquear`);
          } else {
            await axios.post(`${API_URL}/bloqueo/cliente/${this.usuarioEncontrado.idCliente}/desbloquear`);
          }

          Swal.fire('Éxito', 'Usuario desbloqueado correctamente', 'success');
          this.success = 'Usuario desbloqueado correctamente';
          await this.buscarUsuario(); // Recargar información
        } catch (error) {
          this.error = error.response?.data?.message || 'Error al desbloquear el usuario';
          Swal.fire('Error', this.error, 'error');
        }
      }
    },
    resetForm() {
      this.usuarioEncontrado = null;
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.desactivar-usuario-container {
  padding: 20px;
  max-width: 800px;
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
  margin-bottom: 15px;
}

.search-box label {
  min-width: 150px;
  font-weight: bold;
}

.search-box input,
.search-box select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.user-info-section {
  margin-top: 20px;
}

.user-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-card h3 {
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-item strong {
  min-width: 150px;
  color: #555;
}

.status-activo {
  color: #28a745;
  font-weight: bold;
}

.status-bloqueado {
  color: #dc3545;
  font-weight: bold;
}

.motivo-bloqueo {
  color: #dc3545;
  font-style: italic;
}

.action-buttons {
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

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
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
</style>
