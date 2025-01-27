<template>
  <div class="container">
    <h1>Compañias de Vuelos accesibles</h1>
    <p>Estas son algunas de las compañías de vuelos que puede elegir:</p>
    <div class="image-row" v-for="(row, index) in vueloRows" :key="index">
      <div class="image-container" v-for="vuelo in row" :key="vuelo.title">
        <img :src="vuelo.image" :alt="vuelo.title" />
        <span class="image-name">{{ vuelo.title }}</span>
        <button @click="addToCartAction(vuelo)" class="add-to-cart-button" v-if="isAuthenticated">
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
  name: "Popularvuelos",
  components: {
    Icon,
  },
  data() {
    return {
      vuelo: [
        {
          title: "Boliviana de Aviación (BOA)",
          image:
            "https://www.expreso.info/files/2022-05/Boliviana_de_Aviacion.jpg",
          description:
            "Boliviana de Aviación es la aerolínea bandera de Bolivia, ofreciendo vuelos nacionales e internacionales.",
          location: "Bolivia",
          category: "Vuelos",
        },
        {
          title: "Amaszonas",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6jSWIID2SYId_xSREzMb4x9qiqEAFzupA7Q&s",
          description:
            "Amaszonas es una aerolínea regional boliviana que opera vuelos dentro de Bolivia y a países vecinos.",
          location: "Bolivia",
          category: "Vuelos",
        },
        {
          title: "EcoJet",
          image:
            "https://flyecojet.aero/wp-content/uploads/2023/12/995X5001avrof.webp",
          description:
            "EcoJet es una aerolínea boliviana que ofrece vuelos domésticos dentro de Bolivia.",
          location: "Bolivia",
          category: "Vuelos",
        },
        {
          title: "LATAM Airlines",
          image:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/53/b1/4b/latam.jpg?w=1200&h=-1&s=1",
          description:
            "LATAM Airlines es una de las aerolíneas más grandes de América Latina, con vuelos en toda la región y a destinos internacionales.",
          location: "América Latina",
          category: "Vuelos",
        },
        {
          title: "American Airlines",
          image:
            "https://i0.wp.com/bitfinanzas.com/wp-content/uploads/DALL%C2%B7E-2024-01-25-17.56.59-Simple-illustration-of-an-American-Airlines-plane-taking-off-against-a-clear-sky-with-financial-indicators-subtly-integrated-into-the-scene.-The-plan-e1706227113249.jpg?fit=1220%2C697&ssl=1",
          description:
            "American Airlines es una de las aerolíneas más grandes del mundo, con vuelos nacionales e internacionales.",
          location: "Estados Unidos",
          category: "Vuelos",
        },
        {
          title: "United Airlines",
          image:
            "https://skift.com/wp-content/uploads/2024/03/N654UA-United-Airlines-Boeing-767-322ER-1-scaled.jpg",
          description:
            "United Airlines es una aerolínea estadounidense que opera vuelos en América del Norte, América Latina, Europa, Asia y Oceanía.",
          location: "Estados Unidos",
          category: "Vuelos",
        },
        {
          title: "Delta Airlines",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLMWLCD2X0c-_DhZedACZjjGchB6Qp0g3qg&s",
          description:
            "Delta Airlines es una de las aerolíneas más grandes del mundo, con vuelos nacionales e internacionales.",
          location: "Estados Unidos",
          category: "Vuelos",
        },
        {
          title: "Air France",
          image:
            "https://www.pixartprinting.es/blog/wp-content/uploads/2020/10/Aifrance_Cover.jpg",
          description:
            "Air France es la aerolínea bandera de Francia, operando vuelos en toda Europa y a destinos internacionales.",
          location: "Francia",
          category: "Vuelos",
        },
        {
          title: "Star Peru",
          image:
            "https://elcomercio.pe/resizer/YPzQdSQ_PkanZ3Vh0BsXOyg07hI=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/II4XZEYJYBBDFBKDHJWNFC24PA.jpg",
          description:
            "Star Peru es una aerolínea peruana que opera vuelos nacionales dentro de Perú.",
          location: "Perú",
          category: "Vuelos",
        },
        {
          title: "GOL LINHAS AÉREAS INTELIGENTES",
          image:
            "https://contactonews.co/storage/photos/shares/Aviacion/Gol%20Linhas%20Aereas/avion-gol.jpg",
          description:
            "GOL Linhas Aéreas Inteligentes es una aerolínea brasileña que opera vuelos nacionales e internacionales.",
          location: "Brasil",
          category: "Vuelos",
        },
      ],
    };
  },
  computed: {
    vueloRows() {
      const rows = [];
      for (let i = 0; i < this.vuelo.length; i += 4) {
        rows.push(this.vuelo.slice(i, i + 4));
      }
      return rows;
    },
    isAuthenticated() {
      return this.$store.state.loggedIn; // Asumiendo que loggedIn es el estado de autenticación en Vuex
    },
  },
  methods: {
    ...mapActions(["addToCart"]), 
    addToCartAction(vuelo) {
      const item = {
        title: vuelo.title,
        description: vuelo.description,
        category: vuelo.category,
        location: vuelo.location,
        image: vuelo.image,
      };
      if (this.isItemInCart(item)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Este vuelo ya está en tu carrito!",
        });
      } else {
        this.addToCart(item) 
        Swal.fire({
          icon: "success",
          title: "¡Añadido al carrito!",
          text: "El vuelo ha sido añadido al carrito correctamente.",
        });
      }
    },
    isItemInCart(item) {
      return this.$store.state.cartItems.some(
        (cartItem) => cartItem.title === item.title
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
  position: relative; /* Agregar posición relativa para el contenedor */
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

h1 {
  font-size: 30px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
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
</style>
