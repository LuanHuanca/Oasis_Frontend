<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2>Permisos del Usuario</h2>
      <button @click="closePopup">Cerrar</button>
      <div>
        <label>ID:</label>
        <input type="text" v-model="admin.idAdmin" disabled>
      </div>
      <div>
        <label>Correo:</label>
        <input type="text" v-model="admin.correo" disabled>
      </div>
      <div>
        <label>Rol:</label>
        <select v-model="admin.rol.idRol" :disabled="!isEditing">
          <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">{{ rol.rol }}</option>
        </select>
      </div>
      <div>
        <label>Permisos Actuales:</label>
        <div class="chips">
          <span v-for="permiso in currentPermisos" :key="permiso.idPermiso" class="chip green">
            {{ permiso.permiso }}
            <button v-if="isEditing" @click="removePermiso(permiso.idPermiso)">x</button>
          </span>
        </div>
      </div>
      <div>
        <label>Permisos Disponibles:</label>
        <div class="chips">
          <span v-for="permiso in availablePermisos" :key="permiso.idPermiso" class="chip yellow">
            {{ permiso.permiso }}
            <button v-if="isEditing" @click="addPermiso(permiso.idPermiso)">+</button>
          </span>
        </div>
      </div>
      <button v-if="!isEditing" @click="enableEditing">Editar Permisos</button>
      <button v-if="isEditing" @click="savePermissions">Guardar Permisos</button>
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
      isEditing: false
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

        const rolesResponse = await axios.get('http://localhost:9999/api/v1/rol');
        this.roles = rolesResponse.data.result;

        const allPermisosResponse = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = allPermisosResponse.data.result;

        const userPermisosResponse = await axios.get(`http://localhost:9999/api/v1/adminpermiso/admin/${this.adminId}`);
        this.currentPermisos = userPermisosResponse.data.result.map(permiso => permiso.permiso);

        this.updateAvailablePermisos();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    updateAvailablePermisos() {
      this.availablePermisos = this.allPermisos.filter(permiso => 
        !this.currentPermisos.some(currentPermiso => currentPermiso.idPermiso === permiso.idPermiso)
      );
    },
    enableEditing() {
      this.isEditing = true;
    },
    async savePermissions() {
      try {
        // Actualizar el rol del administrador
        await axios.put(`http://localhost:9999/api/v1/admin/updateRole/${this.adminId}`, {
          rolId: this.admin.rol.idRol
        });

        this.isEditing = false;
        Swal.fire('Éxito', 'Permisos asignados correctamente', 'success');
        this.$emit('update'); // Emitir evento de actualización
        this.closePopup();
      } catch (error) {
        console.error('Error al asignar permisos:', error);
        Swal.fire('Error', 'Hubo un problema al asignar los permisos', 'error');
      }
    },
    async removePermiso(permisoId) {
      try {
        await axios.delete(`http://localhost:9999/api/v1/adminpermiso/delete/${this.adminId}/${permisoId}`);
        this.currentPermisos = this.currentPermisos.filter(p => p.idPermiso !== permisoId);
        this.updateAvailablePermisos();
        Swal.fire('Éxito', 'Permiso eliminado correctamente', 'success');
        this.$emit('update'); // Emitir evento de actualización
      } catch (error) {
        console.error('Error al eliminar el permiso:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el permiso', 'error');
      }
    },
    async addPermiso(permisoId) {
      try {
        const permiso = this.availablePermisos.find(p => p.idPermiso === permisoId);
        if (permiso) {
          await axios.post('http://localhost:9999/api/v1/adminpermiso/create', {
            admin: { idAdmin: this.adminId },
            permiso: { idPermiso: permisoId }
          });
          this.currentPermisos.push(permiso);
          this.updateAvailablePermisos();
          Swal.fire('Éxito', 'Permiso añadido correctamente', 'success');
          this.$emit('update'); // Emitir evento de actualización
        }
      } catch (error) {
        console.error('Error al añadir el permiso:', error);
        Swal.fire('Error', 'Hubo un problema al añadir el permiso', 'error');
      }
    },
    closePopup() {
      this.isEditing = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.chips {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  display: inline-block;
  padding: 5px 10px;
  margin: 2px;
  border-radius: 15px;
}

.chip.green {
  background-color: #a5d6a7;
}

.chip.yellow {
  background-color: #fff59d;
}

.chip button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}
</style>