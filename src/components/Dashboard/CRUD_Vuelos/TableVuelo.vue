<template>
  <div class="dashboard">
    <div class="dashboardTitle">
      <h1  style="font-size: 34px">Vuelos</h1>
    </div>
    <div class="total-registros">
      <div style="text-align: left;">
        <button class="create-button" @click="abrirModalCrear">Agregar Vuelo</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Número Reserva</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Aerolinea</th>
          <th>Fecha Ida</th>
          <th>Fecha Vuelta</th>
          <th>Precio</th>
          <th>Personas</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(vuelo, index) in vuelos" :key="index">
          <td>{{ vuelo.idViaje }}</td>
          <td>{{ vuelo.nroReserva }}</td>
          <td>{{ vuelo.ciudad_origen }} - {{ vuelo.pais_origen }}</td>
          <td>{{ vuelo.ciudad_destino }} - {{ vuelo.pais_destino }}</td>
          <td>{{ vuelo.aerolinea }}</td>
          <td>{{ vuelo.fechaInicio }}</td>
          <td>{{ vuelo.fechaFin }}</td>
          <td>{{ vuelo.precio }}</td>
          <td>{{ vuelo.personas }}</td>
          <td style="text-align: center;">
            <i class="fas fa-edit" @click="abrirModal(vuelo)"></i>
            <i class="fas fa-trash" @click="borrarReserva(vuelo.idViaje)"></i>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <RegisterVuelo :show="showCrearModal" @close="showCrearModal = false" @update="getVuelos" />
  <EditVuelo :show="showModal" :vuelo="vueloSeleccionado" @close="showModal = false" @update="getVuelos" />
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import RegisterVuelo from "./RegisterVuelo.vue";
import EditVuelo from "./EditVuelo.vue";

export default {
  name: 'TableVuelo',
  components: {
    RegisterVuelo,
    EditVuelo,
  },
  data() {
    return {
      vuelos: [],
      showModal: false,
      vueloSeleccionado: null,
      showCrearModal: false,
    };
  },
  created() {
    this.getVuelos();
  },
  methods: {
    async getVuelos() {
      try {
        const response = await axios.get(`${API_URL}/vuelo/vuelos`);
        this.vuelos = response.data; // Acceder a la propiedad `result` en la respuesta
        console.log('Vuelos cargados exitosamente:', this.vuelos);
      } catch (error) {
        console.error('Error al cargar los vuelos:', error);
      }
    },
    abrirModalCrear() {
      this.showCrearModal = true;
    },
    abrirModal(vuelo) {
      this.vueloSeleccionado = vuelo;
      this.$emit('editar', this.vueloSeleccionado);
      this.showModal = true;
    },
    async borrarReserva(idVuelo) {

      const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta reserva?');
      if (!confirmacion) {
        return;
      }
      try {
        await axios.delete(`${API_URL}/vuelo/delete/${idVuelo}`);
        this.getVuelos();
        console.log('Vuelo eliminado:', idVuelo);
      } catch (error) {
        console.error('Error al eliminar el vuelo:', error);
      }
    },

  }
};

</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.dashboardTitle {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px; /* Ajustar el espacio entre el título y la tabla */
}

.dashboardTitle h1 {
  flex-grow: 1;
  text-align: center;
  font-size: 1.5em; /* Reducir el tamaño del título en pantallas pequeñas */
  color: #333;
}

.dashboardTitle button {
  margin-left: 20px; /* Ajustar el espacio entre el título y el botón */
  border-radius: 20px;
  border: 2px solid black;
  padding: 8px 16px; /* Reducir el tamaño del botón en pantallas pequeñas */
  background-color: rgb(84, 84, 239);
}

.dashboard {
  width: 95%;
  margin: 20px auto;
  text-align: left;
}

.total-registros {
  background-color: #FCEEDA;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  overflow-x: auto; /* Agregar desplazamiento horizontal en pantallas pequeñas */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #FFD28E;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #FFD28E;
}

.create-button:active {
  background-color: #b36f03;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.create-button:hover {
  background-color: #f3b05f;
  color: white;
}

.create-button {
  margin-top: 10px;
  margin-bottom: 0px;
  background-color: #f48f00;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  box-shadow: 0 9px #999;
}

i {
  cursor: pointer;
  font-size: 1.5em;
}

i.fa-edit {
  color: #3498db;
  margin-right: 15px;
}

i.fa-trash {
  color: #e74c3c;
}

/* Media queries para pantallas pequeñas */
@media (max-width: 768px) {
  .dashboardTitle {
    flex-direction: column;
    align-items: center;
  }

  .dashboardTitle button {
    margin-left: 0;
    margin-top: 20px; /* Ajustar el espacio entre el título y el botón */
  }

  .dashboardTitle h1 {
    font-size: 1.2em;
  }

  .create-button {
    padding: 8px 16px;
  }

  table {
    font-size: 0.8em; /* Reducir el tamaño de fuente en pantallas pequeñas */
  }
}
</style>
