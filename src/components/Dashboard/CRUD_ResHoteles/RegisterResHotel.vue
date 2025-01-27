<template>
  <div v-if="show" class="modal-overlay">
    <div class="reservation">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="reservation-title">Reserva</div>
      <form @submit.prevent="addToCart">
        <div>
          <label for="details">Numero de Reserva:</label>
          <input type="text" id="details" v-model="reservation.nroReservaHotel">
        </div>
        <div>
          <label for="hotel">Hotel:</label>
          <select v-model="reservation.idHotel" required>
            <option v-for="hotel in hoteles" :key="hotel.idHotel" :value="hotel.idHotel">
              {{ hotel.hotel }}
            </option>
          </select>
        </div>
        <div>
          <label for="checkin">Entrada:</label>
          <input type="date" id="checkin" v-model="reservation.fechaInicio">
        </div>
        <div>
          <label for="checkout">Salida:</label>
          <input type="date" id="checkout" v-model="reservation.fechaFin">
        </div>
        <div>
          <label for="rooms">Número de habitaciones:</label>
          <input type="number" id="rooms" min="1" v-model.number="reservation.habitaciones">
        </div>
        <div>
          <label for="guests">Número de personas:</label>
          <input type="number" id="guests" min="1" v-model.number="reservation.personas">
        </div>
        <div>
          <label for="details">Detalle:</label>
          <input type="text" id="details" v-model="reservation.detalle">
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" min="1" v-model="reservation.precio">
        </div>
        <button class="cart-button" type="button" @click="closeModal">Cancelar</button>
        <button class="cart-button" type="submit">
          Registrar Reserva
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['show'],
  data() {
    return {
      reservation: {
        fechaInicio: '',
        fechaFin: '',
        precio: 0,
        personas: 1,
        idHotel: 1,
        nroReservaHotel: '',
        habitaciones: 1,
        detalle: '',
      },
      hoteles: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:9999/api/v1/hotel');
      this.hoteles = response.data.result;
      console.log('Hoteles obtenidos:', this.hoteles);
    } catch (error) {
      console.error('Error al obtener hoteles:', error);
    }
  },
  methods: {
    validatePrice(event) {
      const value = event.target.value;
      const regex = /^\d*\.?\d{0,2}$/;
      if (!regex.test(value)) {
        event.target.value = value.slice(0, -1);
      } else {
        this.reservation.price = value;
      }
    },
    async addToCart() {
      // Enviar solicitud para crear un nuevo administrador
      const response3 = await axios.post('http://localhost:9999/api/v1/reservahotel/create', {


        nroReservaHotel: this.reservation.nroReservaHotel,
        fechaInicio: this.reservation.fechaInicio,
        fechaFin: this.reservation.fechaFin,
        precio: this.reservation.precio,
        personas: this.reservation.personas,
        idHotel: this.reservation.idHotel,
        habitaciones: this.reservation.habitaciones,
        detalle: this.reservation.detalle,

      });

      console.log("Reserva created");

      // Limpiar campos
      this.reservation.nroReservaHotel = '';
      this.reservation.fechaInicio = '';
      this.reservation.fechaFin = '';
      this.reservation.precio = 0;
      this.reservation.personas = 1;
      this.reservation.idHotel = 1;
      this.reservation.habitaciones = 1;
      this.reservation.detalle = '';

      this.$emit('update');
      this.closeModal();
    },

    closeModal() {
      this.$emit('close');
    },
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.reservation {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 60%; /* Reduce el ancho del modal */
  max-width: 600px; /* Tamaño máximo del modal */
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.reservation-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
}

.reservation div {
  margin-bottom: 10px;
}

.reservation label {
  font-weight: bold;
  margin-right: 10px;
}

.reservation input[type="date"],
.reservation input[type="number"],
.reservation input[type="text"] {
  padding: 5px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reservation input[type="number"] {
  width: 100px;
}

.cart-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ff9800;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .reservation {
    width: 80%;
  }

  .cart-button {
    bottom: 10px;
    right: 10px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .reservation input[type="date"],
  .reservation input[type="number"],
  .reservation input[type="text"] {
    font-size: 0.9em;
  }

  .cart-button {
    padding: 5px;
  }
}
</style>
