<template>
  <div class="editar-usuario-container">
    <h2>✏️ Editar Usuario</h2>
    
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

    <div v-if="usuarioEncontrado" class="form-section">
      <form @submit.prevent="guardarCambios" class="edit-form">
        <div v-if="searchType === 'admin'" class="form-group">
          <label>ID Admin:</label>
          <input type="text" :value="usuarioEncontrado.idAdmin" disabled />
        </div>
        
        <div v-if="searchType === 'cliente'" class="form-group">
          <label>ID Cliente:</label>
          <input type="text" :value="usuarioEncontrado.idCliente" disabled />
        </div>

        <div class="form-group">
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            v-model="formData.correo" 
            required
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div v-if="searchType === 'admin'" class="form-group">
          <label>Rol:</label>
          <select v-model="formData.rolId" required>
            <option value="">Seleccione un rol</option>
            <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">
              {{ rol.rol }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Nueva Contraseña (opcional):</label>
          <input 
            type="password" 
            v-model="formData.password" 
            placeholder="Dejar vacío para no cambiar"
          />
          <small>Deje vacío si no desea cambiar la contraseña</small>
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
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Swal from 'sweetalert2';

export default {
  name: 'Editar_Usuario',
  data() {
    return {
      searchType: 'admin',
      userId: '',
      usuarioEncontrado: null,
      roles: [],
      formData: {
        correo: '',
        password: '',
        rolId: null
      },
      error: '',
      success: ''
    };
  },
  mounted() {
    this.cargarRoles();
  },
  methods: {
    async cargarRoles() {
      try {
        const response = await axios.get(`${API_URL}/rol`);
        this.roles = response.data.result || [];
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    },
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
          this.formData.correo = this.usuarioEncontrado.correo || '';
          this.formData.rolId = this.usuarioEncontrado.rol?.idRol || null;
        } else {
          const response = await axios.get(`${API_URL}/cliente/${this.userId}`);
          this.usuarioEncontrado = response.data.result;
          this.formData.correo = this.usuarioEncontrado.correo || '';
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Usuario no encontrado';
        Swal.fire('Error', this.error, 'error');
      }
    },
    async guardarCambios() {
      if (!this.usuarioEncontrado) {
        Swal.fire('Error', 'Debe buscar un usuario primero', 'error');
        return;
      }

      try {
        if (this.searchType === 'admin') {
          const updateData = {
            idAdmin: this.usuarioEncontrado.idAdmin,
            correo: this.formData.correo,
            rol: {
              idRol: this.formData.rolId
            }
          };

          if (this.formData.password) {
            updateData.password = this.formData.password;
          }

          await axios.put(`${API_URL}/admin/update`, updateData);
          Swal.fire('Éxito', 'Administrador actualizado correctamente', 'success');
        } else {
          const updateData = {
            correo: this.formData.correo
          };

          if (this.formData.password) {
            updateData.password = this.formData.password;
          }

          await axios.put(`${API_URL}/cliente/update/${this.usuarioEncontrado.idCliente}`, updateData);
          Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
        }

        this.success = 'Usuario actualizado correctamente';
        this.resetForm();
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar el usuario';
        Swal.fire('Error', this.error, 'error');
      }
    },
    resetForm() {
      this.usuarioEncontrado = null;
      this.formData = {
        correo: '',
        password: '',
        rolId: null
      };
      this.error = '';
      this.success = '';
    }
  }
};
</script>

<style scoped>
.editar-usuario-container {
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
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.form-group small {
  color: #666;
  font-size: 12px;
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
