<template>
  <div>
    <template v-if="isAuthenticated">
      <div class="DashboardContainer">
        <div class="barralateral" style="background-color: black">
          <side-bar :permisos="permisos" @optionSelected="optionSelected" />
        </div>
        <div class="content">
          <component :is="currentComponent" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="administrador">
        <div class="tarjeta">
          <h1>Debe ser usuario administrador para ingresar</h1>
          <p>Puede volver a la pagina principal</p>
          <router-link to="/" class="ruteo">Home</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from "../components/NavBar.vue";
import TableResHotel from "../components/Dashboard/CRUD_ResHoteles/TableResHotel.vue";
import SideBar from "../components/Admin/SideBar.vue";
import TableAudit from "../components/Dashboard/TableAudit.vue";
import TableVuelo from "../components/Dashboard/CRUD_Vuelos/TableVuelo.vue";
import TableAlquilerAu from "../components/Dashboard/CRUD_AlquilerAutos/TableAlquilerAu.vue";
import FormRegisterVue from "../components/Dashboard/ReservaViaje/FormRegisterVue.vue";
import TableComentarios from "../components/Dashboard/Comentarios/TableComentarios.vue";
import TableViaje from "../components/Dashboard/ReservaViaje/TableViaje.vue";
import TableAdmin from "@/components/Dashboard/TableAdmin.vue";
import RegistroCuentas from '@/components/Admin/RegistroCuentas.vue';
import DocumentosInternos from '@/components/Admin/DocumentosInternos.vue';
import Correo from '@/components/Admin/Correo.vue';
import Consultas from '@/components/Admin/Consultas.vue';
import Modificaciones from '@/components/Admin/Modificaciones.vue';
import ABMUsuarios from '@/components/Admin/ABMUsuarios.vue';
import BajaComprobantes from '@/components/Admin/BajaComprobantes.vue';

export default {
  components: {
    NavBar,
    SideBar,
    TableAudit,
    TableResHotel,
    TableVuelo,
    TableAlquilerAu,
    FormRegisterVue,
    TableViaje,
    TableComentarios,
    TableAdmin,
    RegistroCuentas,
    DocumentosInternos,
    Correo,
    Consultas,
    Modificaciones,
    ABMUsuarios,
    BajaComprobantes
  },
  data() {
    return {
      currentComponent: '',
      permisos: [],
      permisosInterval: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.admin;
    },
  },
  methods: {
    async fetchPermisos() {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/adminpermiso/admin/${this.$store.state.id}/permisos`);
        this.permisos = response.data.result.map(permiso => permiso.permiso);
        console.log('Permisos:', this.permisos);
      } catch (error) {
        console.error('Error al obtener los permisos:', error);
      }
    },
    optionSelected(option) {
      switch (option) {
        case "dashboard":
          this.currentComponent = "TableAudit";
          break;
        case "flights":
          this.currentComponent = "TableVuelo";
          break;
        case "hotels":
          this.currentComponent = "TableResHotel";
          break;
        case "cars":
          this.currentComponent = "TableAlquilerAu";
          break;
        case "register_flight":
          this.currentComponent = "FormRegisterVue";
          break;
        case "registers_flights":
          this.currentComponent = "TableViaje";
          break;
        case 'coments':
          this.currentComponent = 'TableComentarios';
          break;
        case 'admin':
          this.currentComponent = 'TableAdmin';
          break;
        case 'registro_cuentas':
          this.currentComponent = 'RegistroCuentas';
          break;
        case 'documentos_internos':
          this.currentComponent = 'DocumentosInternos';
          break;
        case 'correo':
          this.currentComponent = 'Correo';
          break;
        case 'consultas':
          this.currentComponent = 'Consultas';
          break;
        case 'modificaciones':
          this.currentComponent = 'Modificaciones';
          break;
        case 'abm_usuarios':
          this.currentComponent = 'ABMUsuarios';
          break;
        case 'baja_comprobantes':
          this.currentComponent = 'BajaComprobantes';
          break;
        default:
          this.currentComponent = '';
      }
    },
  },
  async created() {
    if (this.isAuthenticated) {
      await this.fetchPermisos();
      this.permisosInterval = setInterval(this.fetchPermisos, 1000); 
    }
  },
  beforeDestroy() {
    if (this.permisosInterval) {
      clearInterval(this.permisosInterval);
    }
  }
};
</script>

<style scoped>
.DashboardContainer {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.barralateral {
  width: 15%;
  height: 100vh;
  background-color: black;
}

.content {
  width: 85%;
}
.administrador {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}
.tarjeta {
  width: 80%;
  border: 1px solid black;
  border-radius: 15px;
  background-color:#FCEEDA;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ruteo{
  background-color: #ff9800;
  color: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  width: 30%;
}
</style>
