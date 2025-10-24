<template>
  <div>
    <h2>Lista de Administradores</h2>
    
    <div class="main-actions">
      <button 
        @click="showCreateRolePopup = true" 
        class="btn btn-primary"
      >
        ➕ Crear nuevo rol
      </button>
      
      <router-link to="/RegistroAdmin">
        <button class="btn btn-secondary">
          👤 Registrar Administrador
        </button>
      </router-link>
    </div>

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
            <button @click="showPermissions(admin.idAdmin)" class="btn btn-action">
              ⚙️ Editar Permisos
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <PermissionsPopup :show="showPopup" :adminId="selectedAdminId" @close="showPopup = false" @update="fetchData" />
    
    <div v-if="showCreateRolePopup" class="popup-overlay">
      <div class="popup-content">
        <h3>Crear nuevo rol</h3>
        <form @submit.prevent="createRole">
          <label for="rol">Nombre del rol:</label>
          <input id="rol" v-model="newRole" required />
          <div class="popup-actions">
            <button type="submit" class="btn btn-primary">
              Crear
            </button>
            <button type="button" @click="showCreateRolePopup = false" class="btn btn-danger">
              Cancelar
            </button>
          </div>
          <div v-if="roleError" class="message error">{{ roleError }}</div>
          <div v-if="roleSuccess" class="message success">{{ roleSuccess }}</div>
        </form>
      </div>
    </div>
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
        , showCreateRolePopup: false
        , newRole: ''
        , roleError: ''
        , roleSuccess: ''
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
      , async createRole() {
        this.roleError = '';
        this.roleSuccess = '';
        try {
          const response = await axios.post('http://localhost:9999/api/v1/rol/create', {
            rol: this.newRole
          });
          if (response.data.code == '200-OK') {
            this.roleSuccess = 'Rol creado exitosamente.';
            this.newRole = '';
          } else {
            this.roleError = 'No se pudo crear el rol.';
          }
        } catch (error) {
          this.roleError = 'Error al crear el rol.';
        }
      }
  }
};
</script>

<style scoped>
/* --- Estilos Base --- */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px 8px; /* Aumento del padding para mejor legibilidad */
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
}

.capsule {
  display: inline-block;
  padding: 5px 10px;
  margin: 2px;
  background-color: #e0e0e0;
  color: #333;
  border-radius: 15px;
  font-size: 0.85rem;
}

/* --- Mejoras de Diseño de Botones --- */

/* Contenedor de acciones principales para mejor espaciado */
.main-actions {
  display: flex;
  gap: 12px; /* Espacio entre los botones */
  margin-bottom: 20px; /* Espacio debajo del grupo de botones */
}

/* Estilo base para todos los botones */
.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 6px; /* Bordes ligeramente redondeados */
  cursor: pointer;
  font-weight: 600; /* Semi-bold */
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  filter: brightness(1.1); /* Ligero brillo al pasar el mouse */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.btn:active {
  filter: brightness(0.9);
  transform: translateY(1px); /* Efecto de "presionar" */
}

/* Botón Primario: para las acciones más importantes (ej. Crear) */
.btn-primary {
  background-color: #007bff; /* Un azul común para acción principal */
  color: white;
}

/* Botón Secundario: para acciones complementarias (ej. Registrar Admin) */
.btn-secondary {
  background-color: #6c757d; /* Gris para acción secundaria */
  color: white;
}

/* Botón de Acción dentro de la tabla (Editar Permisos) */
.btn-action {
  background-color: #ffc107; /* Amarillo para 'Editar/Advertencia' */
  color: #333;
  padding: 8px 14px;
  font-size: 0.9rem;
  box-shadow: none; /* Menos prominente que los principales */
}
.btn-action:hover {
  filter: brightness(1.05);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Botón Peligro: para cancelar o eliminar */
.btn-danger {
  background-color: #dc3545; /* Rojo para Cancelar */
  color: white;
  margin-left: 10px; /* Espacio entre el botón Crear y Cancelar en el popup */
}

/* --- Estilos para el Popup de Crear Rol --- */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Oscurecer un poco más el fondo */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.popup-content {
  background: #fff;
  padding: 30px; /* Más padding */
  border-radius: 10px; /* Bordes más suaves */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25); /* Sombra más profunda */
  min-width: 350px;
}

.popup-content label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
}

.popup-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Asegura que el padding no cambie el ancho total */
}

.popup-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end; /* Alinea los botones a la derecha */
}

/* Estilos para mensajes de estado */
.message {
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    font-weight: 500;
}
.error {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
}
.success {
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
}
</style>