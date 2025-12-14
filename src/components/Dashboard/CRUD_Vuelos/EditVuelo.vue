<template>
  <div v-if="show" class="modal-overlay">
    <div class="reservation">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="reservation-title">Vuelo</div>
      <form @submit.prevent="updateVuelo">
        <div>
          <label for="nroreserva">Numero de Reserva:</label>
          <input type="text" id="details" v-model="formData.nroReserva">
        </div>
        <div>
          <label for="origen">Origen:</label>
          <select v-model="formData.origen" required>
            <option v-for="ciudad in ciudades" :key="ciudad.idCiudad" :value="ciudad.idCiudad">
              {{ ciudad.ciudad }}
            </option>
          </select>
        </div>
        <div>
          <label for="destino">Destino:</label>
          <select v-model="formData.destino" required>
            <option v-for="ciudad in ciudades" :key="ciudad.idCiudad" :value="ciudad.idCiudad">
              {{ ciudad.ciudad }}
            </option>
          </select>
        </div>
        <div>
          <label for="aerolinea">Aerolinea:</label>
          <select v-model="formData.idAerolinea" required>
            <option v-for="aerolinea in aerolineas" :key="aerolinea.idAerolinea" :value="aerolinea.idAerolinea">
              {{ aerolinea.aerolinea }}
            </option>
          </select>
        </div>
        <div>
          <label for="checkin">Fecha de Ida:</label>
          <input type="date" id="checkin" v-model="formData.fechaInicio">
        </div>
        <div>
          <label for="checkout">Fecha de vuelta:</label>
          <input type="date" id="checkout" v-model="formData.fechaFin">
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" v-model="formData.precio">
        </div>
        <div>
          <label for="guests">Número de personas:</label>
          <input type="number" id="guests" min="1" v-model.number="formData.personas">
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
  props: ['show','vuelo'],
  data() {
    return {
      formData: { ...this.vuelo },
      ciudades: [],
      aerolineas:[]
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_URL}/ciudad`);
      this.ciudades = response.data.result;
      console.log('Ciudades obtenidas:', this.ciudades);
    } catch (error) {
      console.error('Error al obtener ciudades:', error);
    }
    try {
      const response = await axios.get(`${API_URL}/aerolinea`);
      this.aerolineas = response.data.result;
      console.log('Aerolineas obtenidas:', this.aerolineas);
    } catch (error) {
      console.error('Error al obtener aerolineas:', error);
    }
  },
  watch: {
    vuelo(newVal) {
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
    // Metodo para actualizar Vuelo
    async updateVuelo (){
      const data = { ...this.formData };
      const response = await axios.put(`${API_URL}/vuelo/update/${this.vuelo.idViaje}`, {
        nroReserva: data.nroReserva,
        origen: data.origen,
        destino: data.destino,
        idAerolinea: data.idAerolinea,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        precio: data.precio,
        personas: data.personas,
      });
      console.log("Vuelo updated");
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
