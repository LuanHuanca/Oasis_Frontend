<template>
  <div>
    <h2>Lista de Administradores</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Permisos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admin in admins" :key="admin.idAdmin">
          <td>{{ admin.idAdmin }}</td>
          <td>{{ admin.correo }}</td>
          <td>{{ admin.rol.rol }}</td>
          <td>
            <span v-for="permiso in adminPermisos[admin.idAdmin]" :key="permiso.idPermiso" class="capsule">
              {{ permiso.permiso }}
            </span>
          </td>
          <td>
            <button @click="showPermissions(admin.idAdmin)">Editar Permisos</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PermissionsPopup :show="showPopup" :adminId="selectedAdminId" @close="showPopup = false" @update="fetchData" />
  </div>
</template>

<script>
import axios from 'axios';
import PermissionsPopup from './PermissionsPopup.vue';

export default {
  components: {
    PermissionsPopup
  },
  data() {
    return {
      admins: [],
      adminPermisos: {},
      showPopup: false,
      selectedAdminId: null
    };
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Obtener todos los administradores
        const adminsResponse = await axios.get('http://localhost:9999/api/v1/admin');
        const admins = adminsResponse.data.result;

        // Obtener todos los permisos de los administradores
        const permisosResponse = await axios.get('http://localhost:9999/api/v1/adminpermiso');
        const adminPermisoData = permisosResponse.data.result;

        // Agrupar permisos por administrador
        const adminPermisos = {};
        adminPermisoData.forEach(item => {
          if (!adminPermisos[item.admin.idAdmin]) {
            adminPermisos[item.admin.idAdmin] = [];
          }
          adminPermisos[item.admin.idAdmin].push(item.permiso);
        });

        // Asignar permisos a los administradores
        admins.forEach(admin => {
          admin.permisos = adminPermisos[admin.idAdmin] || [];
        });

        this.admins = admins;
        this.adminPermisos = adminPermisos;
      } catch (error) {
        console.error('Error al obtener los administradores:', error);
      }
    },
    showPermissions(adminId) {
      this.selectedAdminId = adminId;
      this.showPopup = true;
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.capsule {
  display: inline-block;
  padding: 5px 10px;
  margin: 2px;
  background-color: #e0e0e0;
  border-radius: 15px;
}
</style>