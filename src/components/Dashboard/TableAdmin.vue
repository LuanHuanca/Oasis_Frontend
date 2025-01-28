<template>
  <div>
    <h2>Lista de Administradores</h2>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admin in admins" :key="admin.idAdmin">
          <td>{{ admin.idAdmin }}</td>
          <td>{{ admin.correo }}</td>
          <td>{{ admin.rol.rol }}</td>
          <td>
            <button @click="showPermissions(admin.idAdmin)">Ver Permisos</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PermissionsPopup :show="showPopup" :permisos="permisos" @close="showPopup = false" />
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
      showPopup: false,
      permisos: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:9999/api/v1/admin');
      this.admins = response.data.result;
    } catch (error) {
      console.error('Error al obtener los administradores:', error);
    }
  },
  methods: {
    async showPermissions(adminId) {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/admin/${adminId}/permisos`);
        this.permisos = response.data.result.map(permiso => ({
          ...permiso,
          estado: true // Asumiendo que todos los permisos obtenidos están activos
        }));
        this.showPopup = true;
      } catch (error) {
        console.error('Error al obtener los permisos:', error);
      }
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
</style>