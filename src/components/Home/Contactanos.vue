<template>
  <div class="container" v-if="isAuthenticated">
    <div class="Contactanos">
      <div class="Contactanos-contenedor">
        <form @submit.prevent="addComentary()">
          <h2>Contactanos</h2>
          <p>
            Si tienes dudas, consultas o reclamos con nuestros servicio y/o
            promociones, no dudes en tomar contacto con nosotros. Una Ejecutiva te
            responderá a la brevedad. Solo completa el siguiente formulario.
          </p>
          <textarea  v-model="mensaje" placeholder="Mensaje" /> <br />
          <br />
          <button>Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, useStore} from "vuex";
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: 'PopularAutos',
  components: {
    Icon,
  },
  data() {
    return {
      mensaje: "",
    };
  },

  setup() {
    const store = useStore();

    return {
      user: store.state.id,
    }
  },

  computed: {

    isAuthenticated() {
      return this.$store.state.loggedIn; // Asumiendo que loggedIn es el estado de autenticación en Vuex
    },
  },
  methods: {
    async addComentary() {
      // Enviar solicitud para crear un nuevo administrador
      const response3 = await axios.post('http://localhost:9999/api/v1/comentarios/create', {

        comentario: this.mensaje,
        clienteidCliente: this.user,

      });

      console.log("Comentario created");

      // Limpiar campos
      this.mensaje = ""

    },


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
.Contactanos{
  display: flex;
  align-items: center;
  justify-content: center;
}
.Contactanos-contenedor {
  margin-left: 20px;
  width: 70%;
  display: flex;
  justify-content: center;
}
.Contactanos-contenedor input {
  width: 95%;
  padding: 5px;
  margin: 10px 20px;
  background: #eeeeed;
  border: 1px solid black;
}
.Contactanos-contenedor textarea {
  width: 95%;
  padding: 5px;
  margin: 5px 20px;
  background: #eeeeed;
  border: 1px solid black;
}
.Contactanos-contenedor button {
  margin: 10px 20px;
  border: 1px solid black;
  background: green;
  padding: 5px 25px;
  border-radius: 20px;
}
@media (max-width: 600px) {
  .Contactanos-contenedor {
    width: 90%;
    align-items: center;
    justify-content: center;
  }
}
</style>
