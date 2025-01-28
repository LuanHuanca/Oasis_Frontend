<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2>Permisos del Usuario</h2>
      <button @click="closePopup">Cerrar</button>
      <table>
        <thead>
          <tr>
            <th>Permiso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permiso in allPermisos" :key="permiso.idPermiso">
            <td>{{ permiso.permiso }}</td>
            <td><input type="checkbox" v-model="permiso.estado" :disabled="!canEdit"></td>
          </tr>
        </tbody>
      </table>
      <button v-if="canEdit" @click="assignPermissions">Asignar Permisos</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean,
    adminId: Number,
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allPermisos: [],
      userPermisos: []
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchPermisos();
      }
    }
  },
  methods: {
    async fetchPermisos() {
      try {
        const allPermisosResponse = await axios.get('http://localhost:9999/api/v1/permiso');
        this.allPermisos = allPermisosResponse.data.result.map(permiso => ({
          ...permiso,
          estado: false
        }));

        const userPermisosResponse = await axios.get(`http://localhost:9999/api/v1/rolpermiso/admin/${this.adminId}`);
        this.userPermisos = userPermisosResponse.data.result.map(permiso => permiso.idPermiso);

        this.allPermisos.forEach(permiso => {
          if (this.userPermisos.includes(permiso.idPermiso)) {
            permiso.estado = true;
          }
        });
      } catch (error) {
        console.error('Error al obtener los permisos:', error);
      }
    },
    async assignPermissions() {
      try {
        const selectedPermisos = this.allPermisos.filter(permiso => permiso.estado);
        const promises = selectedPermisos.map(permiso => {
          return axios.post('http://localhost:9999/api/v1/rolpermiso/create', {
            rol: { idRol: this.adminId },
            permiso: { idPermiso: permiso.idPermiso }
          });
        });
        await Promise.all(promises);
        alert('Permisos asignados correctamente');
        this.closePopup();
      } catch (error) {
        console.error('Error al asignar permisos:', error);
      }
    },
    closePopup() {
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
</style>