<template> 
  <div>
    <template v-if="isAuthenticated">
      <div class="DashboardContainer">
        <div class="barralateral" style="background-color: black">
            <side-bar :permisos="$store.state.sidebarPermisos" @optionSelected="optionSelected" />
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
import Editar_Usuario from '@/components/Admin/Editar_Usuario.vue';
import Desactivar_Usuario from '@/components/Admin/Desactivar_Usuario.vue';
import Ver_Lista_Usuarios from '@/components/Admin/Ver_Lista_Usuarios.vue';
import Asignar_Roles from '@/components/Admin/Asignar_Roles.vue';
import Revisar_Accesos_Red from '@/components/Admin/Revisar_Accesos_Red.vue';
import Subir_Documentos_Internos from '@/components/Admin/Subir_Documentos_Internos.vue';
import Ver_Documentos_Internos from '@/components/Admin/Ver_Documentos_Internos.vue';
import Editar_Cuentas from '@/components/Admin/Editar_Cuentas.vue';
import Eliminar_Comprobante from '@/components/Admin/Eliminar_Comprobante.vue';
import Ver_Reportes_Contables from '@/components/Admin/Ver_Reportes_Contables.vue';
import Crear_Solicitud_Viaje from '@/components/Admin/Crear_Solicitud_Viaje.vue';
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
    BajaComprobantes,
  Editar_Usuario,
  Desactivar_Usuario,
  Ver_Lista_Usuarios,
  Asignar_Roles,
  Revisar_Accesos_Red,
  Subir_Documentos_Internos,
  Ver_Documentos_Internos,
  Editar_Cuentas,
  Eliminar_Comprobante,
  Ver_Reportes_Contables,
  Crear_Solicitud_Viaje
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
        // Respetar overrides frontend: si existe override para el usuario actual, usarlo para la sidebar
        const override = this.$store.state.sidebarOverrides && this.$store.state.sidebarOverrides[String(this.$store.state.id)];
        if (override && Array.isArray(override) && override.length > 0) {
          this.$store.commit('setSidebarPermisos', override.map(p => p.permiso));
        } else {
          // También actualizar los permisos usados por la sidebar en el store
          this.$store.commit('setSidebarPermisos', this.permisos);
        }
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
        case 'Editar_Usuario':
          this.currentComponent = 'Editar_Usuario';
          break;
        case 'Registrar_Cuentas':
          this.currentComponent = 'RegistroCuentas';
          break;
        case 'Desactivar_Usuario':
          this.currentComponent = 'Desactivar_Usuario';
          break;
        case 'Ver_Lista_Usuarios':
          this.currentComponent = 'Ver_Lista_Usuarios';
          break;
        case 'Asignar_Roles':
          this.currentComponent = 'Asignar_Roles';
          break;
        case 'Revisar_Accesos_Red':
          this.currentComponent = 'Revisar_Accesos_Red';
          break;
        case 'Subir_Documentos_Internos':
          this.currentComponent = 'Subir_Documentos_Internos';
          break;
        case 'Ver_Documentos_Internos':
          this.currentComponent = 'Ver_Documentos_Internos';
          break;
        case 'Editar_Cuentas':
          this.currentComponent = 'Editar_Cuentas';
          break;
        case 'Eliminar_Comprobante':
          this.currentComponent = 'Eliminar_Comprobante';
          break;
        case 'Ver_Reportes_Contables':
          this.currentComponent = 'Ver_Reportes_Contables';
          break;
        case 'Crear_Solicitud_Viaje':
          this.currentComponent = 'Crear_Solicitud_Viaje';
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
