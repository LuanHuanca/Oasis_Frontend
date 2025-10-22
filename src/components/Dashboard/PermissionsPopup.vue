<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Gestión de Permisos</h2>
        <button @click="closePopup" class="btn-close">
          &times;
        </button>
      </div>

      <div class="admin-details">
        <div class="input-group">
          <label>ID:</label>
          <input type="text" v-model="admin.idAdmin" disabled class="input-disabled">
        </div>
        <div class="input-group">
          <label>Correo:</label>
          <input type="text" v-model="admin.correo" disabled class="input-disabled">
        </div>
        <div class="input-group">
          <label>Rol:</label>
          <select v-model="admin.rol.idRol" :disabled="!isEditing" class="input-select">
            <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">{{ rol.rol }}</option>
          </select>
        </div>
      </div>

      <hr class="separator">

      <div class="permissions-section">
        <h3>Permisos Asignados (Actuales)</h3>
        <div class="chips-container current-chips">
          <span v-for="permiso in isEditing ? editedPermisos : currentPermisos" :key="permiso.idPermiso" class="chip chip-success">
            {{ permiso.permiso }}
            <button v-if="isEditing" @click="removePermiso(permiso.idPermiso)" class="btn-chip-remove">
              &times;
            </button>
          </span>
          <span v-if="(isEditing ? editedPermisos.length : currentPermisos.length) === 0" class="no-permissions">
             (Sin permisos asignados)
          </span>
        </div>
      </div>

      <div v-if="isEditing" class="permissions-section">
        <h3>Permisos Disponibles</h3>
        <div class="chips-container available-chips">
          <span v-for="permiso in availablePermisos" :key="permiso.idPermiso" class="chip chip-info">
            {{ permiso.permiso }}
            <button @click="addPermiso(permiso.idPermiso)" class="btn-chip-add">
              +
            </button>
          </span>
          <span v-if="availablePermisos.length === 0" class="no-permissions">
             (No hay permisos disponibles)
          </span>
        </div>
      </div>

      <hr class="separator">

      <div class="popup-actions">
        <button v-if="!isEditing" @click="enableEditing" class="btn btn-primary">
          📝 Editar Permisos y Rol
        </button>
        <template v-else>
          <button @click="closePopup" class="btn btn-secondary">
            Cancelar
          </button>
          <button @click="savePermissions" class="btn btn-success">
            💾 Guardar Cambios
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: {
    show: Boolean,
    adminId: Number
  },
  data() {
    return {
      admin: {
        idAdmin: '',
        correo: '',
        rol: {
          idRol: ''
        }
      },
      roles: [],
      allPermisos: [],
      currentPermisos: [],
      availablePermisos: [],
      isEditing: false,
      editedPermisos: [],
      originalRolId: ''
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchData();
      }
    }
  },
  methods: {
    async fetchData() {
      try {
        const adminResponse = await axios.get(`http://localhost:9999/api/v1/admin/${this.adminId}`);
        this.admin = adminResponse.data.result;
        this.originalRolId = this.admin.rol.idRol;

        const rolesResponse = await axios.get('http://localhost:9999/api/v1/rol');
        this.roles = rolesResponse.data.result;

        const allPermisosResponse = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = allPermisosResponse.data.result;

        const userPermisosResponse = await axios.get(`http://localhost:9999/api/v1/adminpermiso/admin/${this.adminId}`);
        this.currentPermisos = userPermisosResponse.data.result.map(permiso => permiso.permiso);
        this.editedPermisos = [...this.currentPermisos];

        this.updateAvailablePermisos();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    updateAvailablePermisos() {
      this.availablePermisos = this.allPermisos.filter(permiso => 
        !this.editedPermisos.some(currentPermiso => currentPermiso.idPermiso === permiso.idPermiso)
      );
    },
    enableEditing() {
      this.isEditing = true;
      this.editedPermisos = [...this.currentPermisos];
      this.admin.rol.idRol = this.originalRolId;
      this.updateAvailablePermisos();
    },
    async savePermissions() {
      try {
        // Actualizar el rol si cambió
        if (this.admin.rol.idRol !== this.originalRolId) {
          await axios.put(`http://localhost:9999/api/v1/admin/updateRole/${this.adminId}`, {
            rolId: this.admin.rol.idRol
          });
        }

        // Calcular permisos a agregar y eliminar
        const permisosActualIds = this.currentPermisos.map(p => p.idPermiso);
        const permisosEditadosIds = this.editedPermisos.map(p => p.idPermiso);
        // Permisos a agregar
        const nuevos = permisosEditadosIds.filter(id => !permisosActualIds.includes(id));
        // Permisos a eliminar
        const eliminados = permisosActualIds.filter(id => !permisosEditadosIds.includes(id));

        // Agregar permisos
        for (const id of nuevos) {
          await axios.post('http://localhost:9999/api/v1/adminpermiso/create', {
            admin: { idAdmin: this.adminId },
            permiso: { idPermiso: id }
          });
        }
        // Eliminar permisos
        for (const id of eliminados) {
          await axios.delete(`http://localhost:9999/api/v1/adminpermiso/delete/${this.adminId}/${id}`);
        }

        this.isEditing = false;
        Swal.fire('Éxito', 'Cambios guardados correctamente', 'success');
        this.$emit('update');
        this.closePopup();
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        Swal.fire('Error', 'Hubo un problema al guardar los cambios', 'error');
      }
    },
    addPermiso(permisoId) {
      const permiso = this.availablePermisos.find(p => p.idPermiso === permisoId);
      if (permiso) {
        this.editedPermisos.push(permiso);
        this.updateAvailablePermisos();
      }
    },
    removePermiso(permisoId) {
      this.editedPermisos = this.editedPermisos.filter(p => p.idPermiso !== permisoId);
      this.updateAvailablePermisos();
    },
    closePopup() {
      this.isEditing = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* --- 1. POPUP BASE --- */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Oscurecido más fuerte */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Z-index alto */
}

.popup-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 700px; /* Ancho máximo para no ser demasiado grande */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
}

/* --- 2. CABECERA Y DETALLES --- */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 2rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
}

.btn-close:hover {
  color: #333;
}

.admin-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

.input-disabled {
  background-color: #f5f5f5; /* Color para campos deshabilitados */
  color: #888;
}

.input-select:disabled {
  opacity: 0.7;
}

/* --- 3. CHIPS (PERMISOS) --- */
.separator {
    border: 0;
    height: 1px;
    background-color: #e0e0e0;
    margin: 25px 0;
}

.permissions-section h3 {
    font-size: 1.15rem;
    color: #333;
    margin-bottom: 15px;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Espacio entre los chips */
  padding: 10px;
  border-radius: 8px;
  min-height: 40px;
}

.current-chips {
  border: 1px solid #c8e6c9; /* Borde suave para permisos asignados */
}

.available-chips {
  border: 1px solid #fff9c4; /* Borde suave para permisos disponibles */
}

.chip {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 20px;
  white-space: nowrap;
}

.chip-success {
  background-color: #e8f5e9; /* Verde claro */
  color: #2e7d32; /* Texto verde oscuro */
  border: 1px solid #a5d6a7;
}

.chip-info {
  background-color: #fffde7; /* Amarillo muy claro */
  color: #f9a825; /* Texto amarillo/naranja */
  border: 1px solid #fff59d;
}

.chip button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  transition: transform 0.1s;
}

.btn-chip-remove {
  color: #e57373; /* Rojo suave para eliminar */
}
.btn-chip-remove:hover {
  transform: scale(1.1);
}

.btn-chip-add {
  color: #64b5f6; /* Azul suave para añadir */
}
.btn-chip-add:hover {
  transform: scale(1.1);
}

.no-permissions {
    color: #a0a0a0;
    font-style: italic;
    padding: 6px 10px;
}

/* --- 4. BOTONES DE ACCIÓN (FOOTER) --- */
.popup-actions {
  display: flex;
  justify-content: flex-end; /* Alineación a la derecha */
  gap: 10px;
  padding-top: 15px;
}

/* Estilos de botones unificados */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745; /* Verde para la acción principal de 'Guardar' */
  color: white;
}
.btn-success:hover {
  background-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d; /* Gris para acciones secundarias como 'Cancelar' */
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
</style>