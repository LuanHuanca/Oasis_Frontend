<template>
  <div class="dashboard">
    <div class="dashboardTitle">
      <h1  style="font-size: 34px">Reservas de Hoteles</h1>
    </div>
    <div class="total-registros">
      <div style="text-align: left;">
        <button class="create-button" @click="abrirModalCrear">Agregar Reserva de Hotel</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Número Reserva</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Hotel</th>
          <th>Precio</th>
          <th>Personas</th>
          <th>Habitaciones</th>
          <th>Ciudad</th>
          <th>Pais</th>
          <th>Detalle</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(reservaHotel, index) in reservasHotel" :key="index">
          <td>{{ reservaHotel.idReservaHotel }}</td>
          <td>{{ reservaHotel.nroReservaHotel }}</td>
          <td>{{ reservaHotel.fechaInicio }}</td>
          <td>{{ reservaHotel.fechaFin }}</td>
          <td>{{ reservaHotel.hotel }}</td>
          <td>{{ reservaHotel.precio }}</td>
          <td>{{ reservaHotel.personas }}</td>
          <td>{{ reservaHotel.habitaciones }}</td>
          <td>{{ reservaHotel.ciudad }}</td>
          <td>{{ reservaHotel.pais }}</td>
          <td>{{ reservaHotel.detalle }}</td>
          <td style="text-align: center;">
            <i class="fas fa-edit" @click="abrirModal(reservaHotel)"></i>
            <i class="fas fa-trash" @click="borrarReserva(reservaHotel.idReservaHotel)"></i>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <RegisterResHotel :show="showCrearModal" @close="showCrearModal = false" @update="getReservasHotel" />
  <EditResHotel :show="showModal" :reservation="reservaSeleccionada" @close="showModal = false" @update="getReservasHotel" />
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import RegisterResHotel from "./RegisterResHotel.vue";
import EditResHotel from "./EditResHotel.vue";

export default {
  name: 'TableResHotel',
  components: {
    RegisterResHotel,
    EditResHotel,
  },
  data() {
    return {
      reservasHotel: [],
      showModal: false,
      reservaSeleccionada: null,
      showCrearModal: false,
    };
  },
  created() {
    this.getReservasHotel();
  },
  methods: {
    async getReservasHotel() {
      try {
        const response = await axios.get(`${API_URL}/reservahotel/reservas`);
        this.reservasHotel = response.data; // Acceder a la propiedad `result` en la respuesta
        console.log('Reservas cargadas exitosamente:', this.reservasHotel);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    },
    abrirModalCrear() {
      this.showCrearModal = true;
    },
    abrirModal(reserva) {
      this.reservaSeleccionada = reserva;
      this.$emit('editar', this.reservaSeleccionada);
      this.showModal = true;
    },
    async borrarReserva(idReservaHotel) {

      const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta reserva?');
      if (!confirmacion) {
        return;
      }
      try {
        await axios.delete(`${API_URL}/reservahotel/delete/${idReservaHotel}`);
        this.getReservasHotel();
        console.log('Reserva eliminada:', idReservaHotel);
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
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
  margin: 10px;
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
