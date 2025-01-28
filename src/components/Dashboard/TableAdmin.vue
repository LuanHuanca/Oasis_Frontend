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
    <PermissionsPopup :show="showPopup" :adminId="selectedAdminId" :canEdit="true" @close="showPopup = false" />
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
      selectedAdminId: null
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
</style>