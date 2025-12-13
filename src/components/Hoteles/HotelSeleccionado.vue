<template>
  <div class="product-details">
    <div class="product-image">
      <img :src="hotelData.imagenes" class="hotel-image" alt="Hotel Image" />
    </div>
    <div class="product-info">
      <div class="title">{{ hotelData.hotel }}</div>
      <div class="price">
        {{ hotelData.puntuacion }} Estrellas
        <div class="stars">
          <span v-for="star in filledStars" :key="star">&#9733;</span>
          <span v-for="star in emptyStars" :key="star" class="empty"
            >&#9733;</span
          >
        </div>
      </div>
      <div class="info">
        <div class="rental-details">
          <h3>Datos de Hotel</h3>
          <div class="detail">
            <strong>Habitaciones:</strong> {{ hotelData.totalHabitaciones }}
          </div>
          <div class="detail">
            <strong>Ubicación:</strong> {{ hotelData.ubicacion }}
          </div>
        </div>
        <div class="popular-services">
          <h2>Servicios más populares</h2>
          <div class="services">
            <div
              class="service"
              v-for="service in popularServices"
              :key="service.name"
            >
              <i :class="service.icon"></i>
              <span>{{ service.name }}</span>
            </div>
          </div>
          </div>
          </div>
            <div class="add-to-cart" v-if="isAuthenticated">
              <button @click="addToCartAction">Añadir al Carrito</button>
            </div>
    </div>
  </div>
  <div class="product-description-grid">
    <div class="description">
      <h2>Descripción de Hotel</h2>
      <p>{{ hotelData.descripcion }}</p>
    </div>
  </div>
  <FooterHotel />
</template>

<script>
import axios from "axios";
import FooterHotel from "./FooterHotel.vue";
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      hotelData: {},
      popularServices: [
        { name: "Piscinas", icon: "fas fa-swimming-pool" },
        { name: "Parking gratis", icon: "fas fa-parking" },
        { name: "WiFi gratis", icon: "fas fa-wifi" },
        { name: "Habitaciones familiares", icon: "fas fa-users" },
        { name: "Traslado aeropuerto", icon: "fas fa-shuttle-van" },
        { name: "Restaurante", icon: "fas fa-utensils" },
        { name: "Habitaciones sin humo", icon: "fas fa-smoking-ban" },
        { name: "Bar", icon: "fas fa-glass-martini-alt" },
        { name: "Desayuno", icon: "fas fa-coffee" },
      ],
    };
  },
  mounted() {
    this.fetchHotelData();
  },
  methods: {
    ...mapActions(["addToCart"]),
    fetchHotelData() {
      const hotelId = this.getHotelIdFromURL();
      axios
        .get(`${API_URL}/hotel/${hotelId}`)
        .then((response) => {
          this.hotelData = response.data.result;
        })
        .catch((error) => {
          console.error("Hubo un error al obtener los datos del hotel:", error);
        });
    },
    getHotelIdFromURL() {
      const url = window.location.href;
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    },
    addToCartAction() {
      const item = {
        title: this.hotelData.hotel,
        description: this.hotelData.descripcion,
        category: "Hotel",
        location: this.hotelData.ubicacion,
        image: this.hotelData.imagenes,
      };
      if (this.isItemInCart(item)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Este elemento ya está en tu carrito!",
        });
      } else {
        this.addToCart(item);
        Swal.fire({
          icon: "success",
          title: "¡Añadido al carrito!",
          text: "El elemento ha sido añadido al carrito correctamente.",
        });
      }
    },
    isItemInCart(item) {
      // Verifica si el elemento ya está en el carrito
      return this.$store.state.cartItems.some(
        (cartItem) => cartItem.title === item.title
      );
    },
  },
  components: {
    FooterHotel,
  },
  computed: {
    filledStars() {
      return Array.from(
        { length: this.hotelData.puntuacion },
        (_, index) => index
      );
    },
    emptyStars() {
      return Array.from(
        { length: 5 - this.hotelData.puntuacion },
        (_, index) => index
      );
    },
    isAuthenticated() {
      return this.$store.state.loggedIn; // Asumiendo que loggedIn es el estado de autenticación en Vuex
    },
  },
};
</script>

<style scoped>
.product-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
}

.product-image {
  flex: 1 1 35%;
  position: relative;
  margin-right: 20px;
}

.product-image img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid rgb(7, 46, 219);
}

.product-info {
  flex: 1 1 20%;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: rgb(0, 0, 0);
  text-align: center;
  margin-bottom: 10px;
}

.price {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(0, 0, 0);
}

.stars {
  margin-bottom: 10px;
}

.stars span {
  font-size: 2em;
  color: gold;
}

.stars .empty {
  color: lightgray;
}

.info {
  width: 100%;
}

.rental-details {
  width: 100%;
  margin-bottom: 20px;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.service {
  display: flex;
  align-items: center;
  gap: 5px;
}

.service i {
  color: rgb(45, 211, 45);
}

.product-description-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px;
}

.description,
.map-container {
  flex: 1 1 100%; /* Ajuste para ocupar todo el ancho */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgb(255, 255, 255);
  padding: 20px;
  height: 300px;
}

.description h2,
.description p {
  margin-top: -10px;
}

.popular-services {
  font-family: Arial, sans-serif;
}

.add-to-cart {
  text-align: center;
  margin-top: 20px;
  width: 100%;
  border: 1px solid black;
  border-radius: 15px;
}

.add-to-cart button {
  width: 100%;
  background-color: #65fb8d;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.add-to-cart button:hover {
  background-color: #009e15;
}
</style>
