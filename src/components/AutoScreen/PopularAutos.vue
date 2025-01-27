<template>
  <div class="container">
    <h1>Los Autos más populares para tus próximas vacaciones</h1>
    <p>Estos son algunos autos que han alquilado o comprado otros viajeros:</p>
    <div class="image-row" v-for="(row, index) in filteredAutoRows" :key="index">
      <div class="image-container" v-for="auto in row" :key="auto.alt">
        <img :src="auto.src" :alt="auto.alt">
        <span class="image-name">{{ auto.title }}</span>
        <button @click="addToCartAction(auto)" class="add-to-cart-button" v-if="isAuthenticated">
          <Icon
            icon="ph:shopping-bag-fill"
            width="16"
            height="16"
            style="color: green"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";

export default {
  name: 'PopularAutos',
  components: {
    Icon,
  },
  data() {
    return {
      autos: [
        {
          src: "https://i.pinimg.com/originals/c9/b5/6e/c9b56e1c8c4a7199cd83b27e34be219f.jpg",
          alt: "Auto1",
          title: "DESING SLIDER 1",
          description: "Autos para toda la ciudad",
          category: "AUTOS",
          location: "La Paz",
        },
        {
          src: "https://wallpaper.forfun.com/fetch/90/90091e333f2aa9ee8e35642c93cf6752.jpeg",
          alt: "Auto2",
          title: "DESING SLIDER 2",
          description: "Autos para caminos peligrosos",
          category: "AUTOS",
          location: "Santa Cruz de la Sierra",
        },
        {
          src: "https://arblatinamerica.com/wp-content/uploads/2021/07/Salar-de-Uyuni-1.jpg",
          alt: "Auto3",
          title: "DESING SLIDER 3",
          description: "Autos para acampar con tu familia",
          category: "AUTOS",
          location: "Cochabamba",
        },
        {
          src: "https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/index-subcontent/mh-scroller/abril-2024/mhs/2024-masthead-home-trailblazer-xl.jpg?imwidth=960",
          alt: "Auto4",
          title: "Autos para todo terreno",
          description: "Autos para todo terreno",
          category: "Exclusivos",
          location: "Sucre",
        },
      ],
    };
  },
  computed: {
    filteredAutoRows() {
      const rows = [];
      const selectedCity = this.$store.getters.selectedCity || 'all';
      const filteredAutos = selectedCity === 'all' ? this.autos : this.autos.filter(auto => auto.location === selectedCity);
      for (let i = 0; i < filteredAutos.length; i += 4) {
        rows.push(filteredAutos.slice(i, i + 4));
      }
      return rows;
    },
    isAuthenticated() {
      return this.$store.state.loggedIn; // Asumiendo que loggedIn es el estado de autenticación en Vuex
    },
  },
  methods: {
    ...mapActions(["addToCart"]), 
    addToCartAction(auto) {
      const item = {
        title: auto.title,
        description: auto.description,
        category: auto.category,
        location: auto.location,
        image: auto.src, // Cambié auto.image por auto.src ya que en tus datos autos no hay una propiedad image
      };
      if (this.isItemInCart(item)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Este auto ya está en tu carrito!",
        });
      } else {
        this.addToCart(item)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "¡Añadido al carrito!",
              text: "El auto ha sido añadido al carrito correctamente.",
            });
          })
          .catch(error => {
            console.error("Error al añadir al carrito:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al añadir el auto al carrito.",
            });
          });
      }
    },
    isItemInCart(item) {
      return this.$store.state.cartItems.some(
        cartItem => cartItem.title === item.title
      );
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 30px auto;
  text-align: center;
}

.image-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.image-container {
  flex: 1 1 calc(25% - 20px);
  margin: 10px;
  transition: transform 0.3s ease;
  text-align: center;
  cursor: pointer;
  position: relative; /* Añadido para que el botón se posicione correctamente */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 280px;
  max-height: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: translateY(-5px);
}

.image-container:hover img {
  transform: scale(1.1);
}

.image-name {
  font-size: 15px;
  margin-top: 5px;
}

.add-to-cart-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: aquamarine;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.add-to-cart-button:hover {
  transform: scale(1.1);
}

h1 {
  font-size: 30px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
