<template>
  <div v-if="show" class="modal-overlay">
    <div class="reservation">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="reservation-title">Editar reserva</div>
      <form @submit.prevent="updateReserva">
        <div>
          <label for="details">Numero de Reserva:</label>
          <input type="text" id="details" v-model="formData.nroReservaHotel">
        </div>
        <div>
          <select v-model="formData.idHotel" required>
            <option v-for="hotel in hoteles" :key="hotel.idHotel" :value="hotel.idHotel">
              {{ hotel.hotel }}
            </option>
          </select>
        </div>
        <div>
          <label for="checkin">Entrada:</label>
          <input type="date" id="checkin" v-model="formData.fechaInicio">
        </div>
        <div>
          <label for="checkout">Salida:</label>
          <input type="date" id="checkout" v-model="formData.fechaFin">
        </div>
        <div>
          <label for="rooms">Número de habitaciones:</label>
          <input type="number" id="rooms" min="1" v-model.number="formData.habitaciones">
        </div>
        <div>
          <label for="guests">Número de personas:</label>
          <input type="number" id="guests" min="1" v-model.number="formData.personas">
        </div>
        <div>
          <label for="details">Detalle:</label>
          <input type="text" id="details" v-model="formData.detalle">
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" v-model="formData.precio">
        </div>
        <button class="cart-button" type="button" @click="closeModal">Cancelar</button>
        <button class="cart-button" type="submit">
          Actualizar Reserva Reserva
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['show','reservation'],
  data() {
    return {
      formData: { ...this.reservation },
      hoteles: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_URL}/hotel`);
      this.hoteles = response.data.result;
      console.log('Hoteles obtenidos:', this.hoteles);
    } catch (error) {
      console.error('Error al obtener hoteles:', error);
    }
  },
  watch: {
    reservation(newVal) {
      this.formData = { ...newVal };
      // Convertir la fecha a un formato compatible con el input de tipo 'date'
      if (newVal.fechaInicio) {
        this.formData.fechaInicio = new Date(newVal.fechaInicio).toISOString().split('T')[0];
        this.formData.fechaFin = new Date(newVal.fechaFin).toISOString().split('T')[0];
      }
      if (newVal.fechaFin) {
        this.formData.fechaFin = new Date(newVal.fechaFin).toISOString().split('T')[0];
      }
    },
  },
  methods: {
    // Metodo para actualizar Reserva
    async updateReserva (){
      const data = { ...this.formData };
      const response = await axios.put(`${API_URL}/reservahotel/update/${this.reservation.idReservaHotel}`, {
        nroReservaHotel: data.nroReservaHotel,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        precio: data.precio,
        personas: data.personas,
        idHotel: data.idHotel,
        habitaciones: data.habitaciones,
        detalle: data.detalle,
      });
      console.log("Reserva updated");
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
