<template>
  <div v-if="show" class="modal-overlay">
    <div class="reservation">
      <span class="close-button" @click="closeModal">&times;</span>
      <div class="reservation-title">Alquiler Auto</div>
      <form @submit.prevent="updateAlquiler">
        <div>
          <label for="empresa">Empresa:</label>
          <input type="text" id="details" v-model="formData.empresa">
        </div>
        <div>
          <label for="autos">Autos Disponibles:</label>
          <select v-model="formData.idAuto" required>
            <option v-for="auto in autos" :key="auto.idAuto" :value="auto.idAuto">
              {{ auto.modelo }} {{ auto.marca }} {{ auto.tipo }}
            </option>
          </select>
        </div>
        <div>
          <label for="ciudad">Ciudad:</label>
          <select v-model="formData.idCiudad" required>
            <option v-for="ciudad in ciudades" :key="ciudad.idCiudad" :value="ciudad.idCiudad">
              {{ ciudad.ciudad }}
            </option>
          </select>
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" v-model="formData.precio">
        </div>
        <div>
          <label for="dias">Número de dias:</label>
          <input type="number" id="guests" min="1" v-model.number="formData.dias">
        </div>
        <button class="cart-button" type="button" @click="closeModal">Cancelar</button>
        <button class="cart-button" type="submit">
          Registrar Alquiler
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['show','alquiler'],
  data() {
    return {
      formData: { ...this.alquiler },
      ciudades: [],
      autos: []
    };
  },
  async created() {
    try {
      const response = await axios.get('${API_URL}/auto');
      this.autos = response.data.result;
      console.log('Autos obtenidos:', this.autos);
    } catch (error) {
      console.error('Error al obtener los autos:', error);
    }
    try {
      const response = await axios.get('${API_URL}/ciudad');
      this.ciudades = response.data.result;
      console.log('Ciudades obtenidas:', this.ciudades);
    } catch (error) {
      console.error('Error al obtener ciudades:', error);
    }
  },
  watch: {
    alquiler(newVal) {
      this.formData = { ...newVal };
    },
  },
  methods: {
    // Metodo para actualizar Vuelo
    async updateAlquiler (){
      const data = { ...this.formData };
      const response = await axios.put(`${API_URL}/alquilerAuto/update/${this.alquiler.idAlquiler}`, {
        empresa: data.empresa,
        idAuto: data.idAuto,
        idCiudad: data.idCiudad,
        precio: data.precio,
        dias: data.dias,
      });
      console.log("Alquiler updated");
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
