<template>
  <div class="quote-modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <div id="invoice-content">
        <div class="header">
          <div class="logo">
            <img style="width: 100%" src="/src/assets/Home/carusel/Logo.png" alt="Logo de la empresa">
          </div>
          <div class="company-info" style="color: black">
            <h2>Agencia de Viajes TU GUIA</h2>
            <p>Dirección: Av. 14 de Septiembre Nº 4807 esquina, La Paz</p>
            <p>Teléfono: (+591) 68171114</p>
            <p>Email: agencia.viajes.oasis@gmail.com</p>
          </div>
          <div class="invoice-info" style="color: black">
            <h2>Factura  </h2>
            <p><strong>Fecha:</strong> {{ quoteInfo.fecha }}  </p>
            <p><strong>Nro Reserva:</strong> {{ quoteInfo.idReservaViaje }}  </p>
          </div>
        </div>

        <div class="quote-info">
          <div class="section">
            <h3>Cliente</h3>
            <p><strong>Nombre:</strong> {{ quoteInfo.cliente.nombre }} {{ quoteInfo.cliente.apellidoP }}</p>
            <p><strong>Correo:</strong> {{ quoteInfo.cliente.correo }}</p>
            <p><strong>Teléfono:</strong> {{ quoteInfo.cliente.telefono }}</p>
          </div>

          <div class="section">
            <h3>Información de Facturación</h3>
            <p><strong>Nit:</strong> <input v-model="nit" type="text" placeholder="Ingrese el Nit"></p>
            <p><strong>Forma de pago:</strong>
              <select v-model="formaPagoSeleccionado" required>
                <option v-for="pago in formasPago" :key="pago.idFormP" :value="pago.idFormP">
                  {{ pago.formapago }}
                </option>
              </select>
            </p>
          </div>

          <div class="section">
            <h3>Detalles del Viaje</h3>
            <div class="details">
              <div class="detail-item">
                <h4>Hotel</h4>
                <p><strong>Hotel:</strong> {{ quoteInfo.hotel.hotel }}</p>
                <p><strong>Check-in:</strong> {{ quoteInfo.hotel.fechaInicio }}</p>
                <p><strong>Check-out:</strong> {{ quoteInfo.hotel.fechaFin }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.hotel.precio) }}</p>
              </div>
              <div class="detail-item">
                <h4>Vuelo</h4>
                <p><strong>Aerolínea:</strong> {{ quoteInfo.vuelo.aerolinea }}</p>
                <p><strong>Origen:</strong> {{ quoteInfo.vuelo.ciudad_origen }} - {{ quoteInfo.vuelo.pais_origen }}</p>
                <p><strong>Destino:</strong> {{ quoteInfo.vuelo.ciudad_destino }} - {{ quoteInfo.vuelo.pais_destino }}</p>
                <p><strong>Fecha de Salida:</strong> {{ quoteInfo.vuelo.fechaInicio }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.vuelo.precio) }}</p>
              </div>
              <div class="detail-item">
                <h4>Alquiler de Auto</h4>
                <p><strong>Empresa:</strong> {{ quoteInfo.auto.empresa }}</p>
                <p><strong>Modelo:</strong> {{ quoteInfo.auto.marca }} - {{ quoteInfo.auto.modelo }}</p>
                <p><strong>Recogida:</strong> {{ quoteInfo.auto.fechaRecogida }}</p>
                <p><strong>Devolución:</strong> {{ quoteInfo.auto.fechaDevolucion }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.auto.precio) }}</p>
              </div>
              <div class="detail-item">
                <h4>Atracción</h4>
                <p><strong>Atracción:</strong> {{ quoteInfo.atraccion.atraccion }}</p>
                <p><strong>Categoría:</strong> {{ quoteInfo.atraccion.categoria }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.atraccion.precio) }}</p>
              </div>
              <div class="detail-item">
                <h4>Actividad</h4>
                <p><strong>Actividad:</strong> {{ quoteInfo.actividad.actividad }}</p>
                <p><strong>Fecha:</strong> {{ quoteInfo.actividad.fecha }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.actividad.precio) }}</p>
              </div>
              <div class="detail-item">
                <h4>Seguro</h4>
                <p><strong>Seguro:</strong> {{ quoteInfo.seguro.seguro }}</p>
                <p><strong>Cobertura:</strong> {{ quoteInfo.seguro.cobertura }}</p>
                <p><strong>Precio:</strong> {{ formatCurrency(quoteInfo.seguro.precio) }}</p>
              </div>
            </div>
          </div>

          <div class="section totals">
            <h3>Totales</h3>
            <p><strong>Subtotal:</strong> {{ formatCurrency(subtotal) }}</p>
            <p><strong>Impuesto (15%):</strong> {{ formatCurrency(tax) }}</p>
            <p><strong>Total:</strong> {{ formatCurrency(total) }}</p>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button @click="verfactura()">Ver Factura</button>
        <button @click="saveAndClose">Confirmar Reserva de Viaje</button>
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>

    <modal :isOpen="showFacturaModal" @close="showFacturaModal = false">
      <Factura :quoteInfo="quoteInfo" :nitEn="nitEnvio" :pago="formaPagoSeleccionado" @close="showFacturaModal = false"></Factura>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Factura from "./Factura.vue";
import Modal from './Modal.vue';

export default {
  components: {Modal, Factura},
  data(){
    return{
      formasPago:[],
      formaPagoSeleccionado:"",
      nit:"",
      nitEnvio:"",
      showFacturaModal: false,
    };
  },
  props: {
    quoteInfo: Object
  },
  computed: {
    subtotal() {
      return (
          this.quoteInfo.hotel.precio +
          this.quoteInfo.vuelo.precio +
          this.quoteInfo.auto.precio +
          this.quoteInfo.atraccion.precio +
          this.quoteInfo.actividad.precio +
          this.quoteInfo.seguro.precio
      );
    },
    tax() {
      return this.subtotal * 0.15; // 15% de impuesto
    },
    total() {
      return this.subtotal + this.tax;
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:9999/api/v1/formaPago');
      this.formasPago = response.data.result;
      console.log('Metodos de pago obtenidos:', this.formasPago);
    } catch (error) {
      console.error('Error al obtener metodos de pago:', error);
    }
  },

  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
      }).format(value);
    },
    closeModal() {
      this.$emit('close');
    },
    async saveAndClose() {

      // Enviar solicitud para crear una factura
      const response3 = await axios.post('http://localhost:9999/api/v1/facturacion/create', {

        fecha: this.quoteInfo.fecha,
        nit: this.nit,
        clienteidCliente: this.quoteInfo.cliente.idCliente,
        reservaViajeidReservaViaja: this.quoteInfo.idReservaViaje,
        formaPagoidFormP: this.formaPagoSeleccionado,

      });
      console.log("Factura created");
      this.$emit("close");
    },

    async verfactura (){
      this.nitEnvio = this.nit;
      this.showFacturaModal = true;
    },
  }
};
</script>

<style scoped>
.quote-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Para alinear verticalmente */
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.logo {
  width: 20%; /* Ancho del logo */
  height: 100%;
}

.company-info {
  width: 30%; /* Ancho de la información de la empresa */
}

.invoice-info {
  width: 30%; /* Ancho de la información de la factura */
}

.invoice-info {
  width: 50%;
  text-align: right;
}

.quote-info {
  margin-top: 20px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  margin-bottom: 10px;
  color: #333;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.detail-item {
  flex: 1;
  min-width: 200px;
}

.totals {
  border-top: 2px solid #ddd;
  padding-top: 10px;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
