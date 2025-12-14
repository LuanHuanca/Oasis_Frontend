<template>
  <div class="pop-up">
    <div class="pop-up-inner">
      <div class="pop-up-close" @click="close">&times;</div>
      <h1>Tu Carrito de Compras</h1>
      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Tu carrito está vacío.</p>
        </div>
        <div v-else>
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item"
          >
            <img :src="item.image" alt="Item image" class="cart-item-image" />
            <div class="cart-item-details">
              <h2>{{ item.title }}</h2>
              <p>Descripcion: {{ item.description }}</p>
              <p>Categoria:{{ item.category }}</p>
              <p>Ubicacion:{{ item.location }}</p>
            </div>
            <button @click="removeFromCart(index)">Eliminar</button>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length > 0" class="pop-up-button">
        <button @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import { API_URL, BASE_URL } from '@/config/api';
import Swal from "sweetalert2"; // Importar SweetAlert

export default {
  data(){
    return{
      actividad: "Envio de cotizacion",
      fecha: "",
      hora: "",
      fechaInicio: "",
      fechaFin: "",
      ipAddress: "",
    }
  },
  computed: {
    ...mapState(["cartItems", "user"]),
  },
  methods: {
    ...mapActions(["removeFromCart"]),
    async checkout() {
      const correoUsuario = this.user.result.correo;

      let emailContent = `
        <h1>Detalles de tu carrito de compras</h1>
        <p>Estimado/a usuari@,</p>
        <p>Gracias por elegir nuestros servicios. Aquí están los detalles de tu carrito:</p>
        <ul>
      `;

      this.cartItems.forEach((item) => {
        emailContent += `
          <li>
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="Item image" style="width: 300px; heigth:300px;">
            <p><strong>Descripción:</strong> ${item.description}</p>
            <p><strong>Categoría:</strong> ${item.category}</p>
            <p><strong>Ubicación:</strong> ${item.location}</p>
          </li>
          <hr>
        `;
      });

      emailContent += `
        </ul>
        <p>Esperamos verte pronto.</p>
        <p>Saludos,<br>El equipo de Tu Guia</p>
      `;

      // Enviar solicitud al backend para enviar el correo
      try {
        const url = `${BASE_URL}/mail/send/${correoUsuario}`;
        const response = await axios.post(url, {
          subject: "Detalles de tu carrito de compras - Tu Guia",
          message: emailContent,
        });

        // Verificar la respuesta del backend
        if (response.data && response.data.code === "200-OK") {
          await this.crearAuditoria();

          // Mostrar notificación de éxito
          Swal.fire({
            icon: "success",
            title: "Correo enviado",
            text: response.data.result || "El correo ha sido enviado exitosamente.",
          });
        } else {
          // El backend devolvió un error
          const errorMessage = response.data?.message || "Error desconocido al enviar el correo";
          console.error("Error del backend:", errorMessage);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMessage,
          });
        }

      } catch (error) {
        console.error("Error enviando correo:", error);
        // Mostrar notificación de error con más detalles
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Hubo un error al enviar el correo. Por favor, verifica tu conexión e intenta de nuevo.";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    },
    async crearAuditoria() {
      try {
        const correoUsuario = this.user.result.correo;

        // Calcular fecha
        const ahora = new Date();
        const dia = String(ahora.getDate()).padStart(2, "0");
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const anio = ahora.getFullYear();
        const horas = String(ahora.getHours()).padStart(2, "0");
        const minutos = String(ahora.getMinutes()).padStart(2, "0");
        const segundos = String(ahora.getSeconds()).padStart(2, "0");

        this.fecha = `${anio}-${mes}-${dia}`;
        this.hora = `${horas}:${minutos}:${segundos}`;
        this.fechaInicio = `${this.fecha}T${this.hora}`;
        this.fechaFin = `${this.fecha}T${this.hora}`;

        // Obtener dirección IP
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log("IP: ", data.ip);
        this.ipAddress = data.ip;
        console.log("correo " + correoUsuario);
        await axios.post(`${API_URL}/auditoria/create`, {
          correo: correoUsuario,
          actividad: this.actividad,
          fecha: this.fecha,
          hora: this.hora,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          ip: this.ipAddress,
        });
        console.log("Auditoría creada");
      } catch (error) {
        console.error("Error al crear la auditoría:", error);
      }
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>



<style>
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 32px 16px 120px;
  height: 100vh;
  width: 100%;
  background-color: rgba(144, 216, 214, 0.5);
  display: grid;
  place-items: center;
}

.pop-up h1 {
  display: flex;
  justify-content: center;
}

.pop-up button {
  background-color: rgb(164, 227, 200);
  color: #000;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px 20px;
  margin: 19px 0 0 0;
}

.pop-up-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-up-close {
  position: absolute;
  height: 52px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  font-size: 3rem;
  color: black;
  cursor: pointer;
}

.pop-up-inner {
  background-color: #fff;
  color: #000;
  position: relative;
  width: 70%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease-in-out;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
  height: 400px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  flex: 1;
}

.cart-item h2 {
  margin: 0 0 10px 0;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease-in-out;
}

.fade-leave-active {
  transition-delay: 250ms;
}
</style>
