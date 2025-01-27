<template>
  <div>
    <template v-if="isAuthenticated">
      <div class="DashboardContainer">
        <div class="barralateral" style="background-color: black">
          <side-bar @optionSelected="optionSelected" />
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
import NavBar from "../components/NavBar.vue";
import TableResHotel from "../components/Dashboard/CRUD_ResHoteles/TableResHotel.vue";
import SideBar from "../components/Admin/SideBar.vue";
import TableAudit from "../components/Dashboard/TableAudit.vue";
import TableVuelo from "../components/Dashboard/CRUD_Vuelos/TableVuelo.vue";
import TableAlquilerAu from "../components/Dashboard/CRUD_AlquilerAutos/TableAlquilerAu.vue";
import FormRegisterVue from "../components/Dashboard/ReservaViaje/FormRegisterVue.vue";
import TableComentarios from "../components/Dashboard/Comentarios/TableComentarios.vue";
import TableViaje from "../components/Dashboard/ReservaViaje/TableViaje.vue";

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

  },
  data() {
    return {
      currentComponent: "TableAudit",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.admin;
    },
  },
  methods: {
    optionSelected(option) {
      switch (option) {
        case "admin":
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
        default:
          this.currentComponent = "TableAudit";
      }
    },
  },
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
