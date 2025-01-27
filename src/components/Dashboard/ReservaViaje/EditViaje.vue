<template>
  <div v-if="show" class="modal-overlay">
    <div class="reservation">
      <span class="close-button" @click="closeModal">&times;</span>
      <h1>Formulario de Agencia de Viajes</h1>

      <div class="date-input">
        <label for="date">Seleccione una fecha:</label>
        <input type="date" id="date" v-model="selectedDate" required>
      </div>
      <div class="scrollable-content">
        <div class="sections-container">
          <section class="section-item">
            <h2>Hotel</h2>
            <button @click="showHotelModal = true">Seleccionar Hotel</button>
            <button @click="deselectHotel">Ninguna</button>
            <div v-if="selectedHotel" class="panel">
              <h3>Hotel Seleccionado</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedHotel.idReservaHotel }}</p>
                  <p><strong>Nro Reserva:</strong> {{ selectedHotel.nroReservaHotel }}</p>
                  <p><strong>Fecha Inicio:</strong> {{ selectedHotel.fechaInicio }}</p>
                  <p><strong>Fecha Fin:</strong> {{ selectedHotel.fechaFin }}</p>
                  <p><strong>Hotel:</strong> {{ selectedHotel.hotel }}</p>
                </div>
                <div class="column">
                  <p><strong>Precio:</strong> {{ selectedHotel.precio }}</p>
                  <p><strong>Personas:</strong> {{ selectedHotel.personas }}</p>
                  <p><strong>Habitaciones:</strong> {{ selectedHotel.habitaciones }}</p>
                  <p><strong>Ciudad:</strong> {{ selectedHotel.ciudad }}</p>
                  <p><strong>País:</strong> {{ selectedHotel.pais }}</p>
                  <p><strong>Detalle:</strong> {{ selectedHotel.detalle }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Vuelo</h2>
            <button @click="showFlightModal = true">Seleccionar Vuelo</button>
            <div v-if="selectedFlight" class="panel">
              <h3>Vuelo Seleccionado</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedFlight.idViaje }}</p>
                  <p><strong>Nro Reserva:</strong> {{ selectedFlight.nroReserva }}</p>
                  <p><strong>Origen:</strong> {{ selectedFlight.ciudad_origen }} - {{ selectedFlight.pais_origen }}</p>
                  <p><strong>Destino:</strong> {{ selectedFlight.ciudad_destino }} - {{ selectedFlight.pais_destino }}</p>
                  <p><strong>Aerolínea:</strong> {{ selectedFlight.aerolinea }}</p>
                </div>
                <div class="column">
                  <p><strong>Fecha Inicio:</strong> {{ selectedFlight.fechaInicio }}</p>
                  <p><strong>Fecha Fin:</strong> {{ selectedFlight.fechaFin }}</p>
                  <p><strong>Precio:</strong> {{ selectedFlight.precio }}</p>
                  <p><strong>Personas:</strong> {{ selectedFlight.personas }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Alquiler de Auto</h2>
            <button @click="showCarModal = true">Seleccionar Auto</button>
            <button @click="deselectCar">Ninguna</button>
            <div v-if="selectedCar" class="panel">
              <h3>Auto Seleccionado</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedCar.idAlquiler }}</p>
                  <p><strong>Empresa:</strong> {{ selectedCar.empresa }}</p>
                  <p><strong>Marca:</strong> {{ selectedCar.marca }}</p>
                  <p><strong>Modelo:</strong> {{ selectedCar.modelo }}</p>
                  <p><strong>Tipo:</strong> {{ selectedCar.tipo }}</p>
                </div>
                <div class="column">
                  <p><strong>Días:</strong> {{ selectedCar.dias }}</p>
                  <p><strong>Precio:</strong> {{ selectedCar.precio }}</p>
                  <p><strong>Ciudad:</strong> {{ selectedCar.ciudad }}</p>
                  <p><strong>País:</strong> {{ selectedCar.pais }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Atracción</h2>
            <button @click="showAttractionModal = true">Seleccionar Atracción</button>
            <button @click="deselectAttraction">Ninguna</button>
            <div v-if="selectedAttraction" class="panel">
              <h3>Atracción Seleccionada</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedAttraction.idAtraccion }}</p>
                  <p><strong>Atracción:</strong> {{ selectedAttraction.atraccion }}</p>
                  <p><strong>Precio:</strong> {{ selectedAttraction.precio }}</p>
                  <p><strong>Categoría:</strong> {{ selectedAttraction.categoria }}</p>
                </div>
                <div class="column">
                  <p><strong>Ciudad:</strong> {{ selectedAttraction.ciudad }}</p>
                  <p><strong>País:</strong> {{ selectedAttraction.pais }}</p>
                  <p><strong>Detalle:</strong> {{ selectedAttraction.detalle }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Actividad</h2>
            <button @click="showActivityModal = true">Seleccionar Actividad</button>
            <button @click="deselectActivity">Ninguna</button>
            <div v-if="selectedActivity" class="panel">
              <h3>Actividad Seleccionada</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedActivity.idActividad }}</p>
                  <p><strong>Actividad:</strong> {{ selectedActivity.actividad }}</p>
                  <p><strong>Fecha:</strong> {{ selectedActivity.fecha }}</p>
                  <p><strong>Precio:</strong> {{ selectedActivity.precio }}</p>
                </div>
                <div class="column">
                  <p><strong>Categoría:</strong> {{ selectedActivity.categoria }}</p>
                  <p><strong>Ciudad:</strong> {{ selectedActivity.ciudad }}</p>
                  <p><strong>País:</strong> {{ selectedActivity.pais }}</p>
                  <p><strong>Detalle:</strong> {{ selectedActivity.detalle }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Cliente</h2>
            <button @click="showClientModal = true">Seleccionar Cliente</button>
            <div v-if="selectedClient" class="panel">
              <h3>Cliente Seleccionado</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedClient.idCliente }}</p>
                  <p><strong>Correo:</strong> {{ selectedClient.correo }}</p>
                  <p><strong>Estado Cuenta:</strong> {{ selectedClient.estadoCuenta }}</p>
                  <p><strong>ID Persona:</strong> {{ selectedClient.idPersona }}</p>
                </div>
                <div class="column">
                  <p><strong>Nombre:</strong> {{ selectedClient.nombre }}</p>
                  <p><strong>Apellido Paterno:</strong> {{ selectedClient.apellidoP }}</p>
                  <p><strong>Apellido Materno:</strong> {{ selectedClient.apellidoM }}</p>
                  <p><strong>Teléfono:</strong> {{ selectedClient.telefono }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section-item">
            <h2>Seguro</h2>
            <button @click="showInsuranceModal = true">Seleccionar Seguro</button>
            <div v-if="selectedInsurance" class="panel">
              <h3>Seguro Seleccionado</h3>
              <div class="info">
                <div class="column">
                  <p><strong>ID:</strong> {{ selectedInsurance.idSeguro }}</p>
                  <p><strong>Seguro:</strong> {{ selectedInsurance.seguro }}</p>
                </div>
                <div class="column">
                  <p><strong>Cobertura:</strong> {{ selectedInsurance.cobertura }}</p>
                  <p><strong>Precio:</strong> {{ selectedInsurance.precio }}</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      <h2></h2>

      <div style="text-align: center;">
        <button class="create-button" @click="updateViaje">Actualizar Reserva de Viaje</button>
      </div>

      <!-- Modales -->
      <modal :isOpen="showHotelModal" @close="showHotelModal = false">
        <hotel-list :reservaHoteles="reservaHoteles" @select-hotel="selectHotel"></hotel-list>
      </modal>

      <modal :isOpen="showFlightModal" @close="showFlightModal = false">
        <flight-list :vuelos="vuelos" @select-flight="selectFlight"></flight-list>
      </modal>

      <modal :isOpen="showCarModal" @close="showCarModal = false">
        <car-list :alquileresAuto="alquileresAuto" @select-car="selectCar"></car-list>
      </modal>

      <modal :isOpen="showAttractionModal" @close="showAttractionModal = false">
        <attraction-list :atracciones="atracciones" @select-attraction="selectAttraction"></attraction-list>
      </modal>

      <modal :isOpen="showActivityModal" @close="showActivityModal = false">
        <activity-list :actividades="actividades" @select-activity="selectActivity"></activity-list>
      </modal>

      <modal :isOpen="showClientModal" @close="showClientModal = false">
        <client-list :clientes="clientes" @select-client="selectClient"></client-list>
      </modal>

      <modal :isOpen="showInsuranceModal" @close="showInsuranceModal = false">
        <insurance-list :seguros="seguros" @select-insurance="selectInsurance"></insurance-list>
      </modal>
    </div>
  </div>
</template>

<script>
import HotelList from './HotelList.vue';
import FlightList from './FlightList.vue';
import CarList from './CarList.vue';
import AttractionList from './AttractionList.vue';
import ActivityList from './ActivityList.vue';
import ClientList from './ClientList.vue';
import InsuranceList from './InsuranceList.vue';
import Modal from './Modal.vue';
import axios from "axios";

export default {
  components: {
    ActivityList,
    FlightList,
    CarList,
    ClientList,
    AttractionList,
    HotelList,
    InsuranceList,
    Modal
  },
  props: ['show','viaje'],
  data() {
    return {
      formData: { ...this.viaje },
      showHotelModal: false,
      showFlightModal: false,
      showCarModal: false,
      showAttractionModal: false,
      showActivityModal: false,
      showClientModal: false,
      showInsuranceModal: false,
      reservaHoteles: [],
      vuelos: [],
      alquileresAuto: [],
      atracciones: [],
      actividades: [],
      clientes: [],
      seguros: [],
      selectedHotel: null,
      selectedFlight: null,
      selectedCar: null,
      selectedAttraction: null,
      selectedActivity: null,
      selectedClient: null,
      selectedInsurance: null,
      selectedDate: null,
      defaultHotelId: 1,
      defaultFlightId: 1,
      defaultCarId: 1,
      defaultAttractionId: 1,
      defaultActivityId: 1,
      defaultClientId: 1,
      defaultInsuranceId: 1,
    };
  },
  async created() {
    try {
      const response1 = await axios.get('http://localhost:9999/api/v1/reservahotel/reservas');
      this.reservaHoteles = response1.data;
      console.log('Reservas de Hoteles obtenidos:', this.reservaHoteles);
    } catch (error) {
      console.error('Error al obtener Reservas de Hoteles:', error);
    }
    try {
      const response2 = await axios.get('http://localhost:9999/api/v1/vuelo/vuelos');
      this.vuelos = response2.data;
      console.log('Vuelos obtenidos:', this.vuelos);
    } catch (error) {
      console.error('Error al obtener vuelos:', error);
    }
    try {
      const response = await axios.get(`http://localhost:9999/api/v1/alquilerAuto/alquierAutos`);
      this.alquileresAuto = response.data; // Acceder a la propiedad `result` en la respuesta
      console.log('Alquileres cargados exitosamente:', this.alquileresAuto);
    } catch (error) {
      console.error('Error al cargar los alquileres:', error);
    }

    try {
      const response = await axios.get(`http://localhost:9999/api/v1/atraccion/atracciones`);
      this.atracciones = response.data; // Acceder a la propiedad `result` en la respuesta
      console.log('atracciones cargados exitosamente:', this.atracciones);
    } catch (error) {
      console.error('Error al cargar los atracciones:', error);
    }

    try {
      const response = await axios.get(`http://localhost:9999/api/v1/actividad/actividades`);
      this.actividades = response.data; // Acceder a la propiedad `result` en la respuesta
      console.log('actividades cargados exitosamente:', this.actividades);
    } catch (error) {
      console.error('Error al cargar los actividades:', error);
    }

    try {
      const response = await axios.get(`http://localhost:9999/api/v1/seguro`);
      this.seguros = response.data.result; // Acceder a la propiedad `result` en la respuesta
      console.log('seguros cargados exitosamente:', this.seguros);
    } catch (error) {
      console.error('Error al cargar los seguros:', error);
    }

    try {
      const response = await axios.get(`http://localhost:9999/api/v1/cliente/clientes`);
      this.clientes = response.data; // Acceder a la propiedad `result` en la respuesta
      console.log('clientes cargados exitosamente:', this.clientes);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
    console.log("ID RESERVA: " + this.formData.idReservaViaje);

    this.selectedDate = new Date(this.viaje.fecha).toISOString().split('T')[0];
    this.defaultHotelId = this.viaje.idReservaHotel;
    this.defaultFlightId = this.viaje.idViaje;
    this.defaultCarId = this.viaje.idAlquiler;
    this.defaultAttractionId = this.viaje.idAtraccion;
    this.defaultActivityId = this.viaje.idActividad;
    this.defaultClientId = this.viaje.idCliente;
    this.defaultInsuranceId = this.viaje.idSeguro;

    // Imprimir datos cargados
    /*
    console.log("Default Hotel ID: " + this.defaultHotelId);
    console.log("Default Flight ID: " + this.defaultFlightId);
    console.log("Default Car ID: " + this.defaultCarId);
    console.log("Default Attraction ID: " + this.defaultAttractionId);
    console.log("Default Activity ID: " + this.defaultActivityId);
    console.log("Default Client ID: " + this.defaultClientId);
    console.log("Default Insurance ID: " + this.defaultInsuranceId);
     */

    this.loadDefaultHotel();
    this.loadDefaultFlight();
    this.loadDefaultCar();
    this.loadDefaultAttraction();
    this.loadDefaultActivity();
    this.loadDefaultClient();
    this.loadDefaultInsurance();
  },

  watch: {
    viaje(newVal) {
      this.formData = { ...newVal };
      console.log("New Val: " + newVal.fecha);
      // Convertir la fecha a un formato compatible con el input de tipo 'date'
      if (newVal.fecha) {
        this.selectedDate = new Date(newVal.fecha).toISOString().split('T')[0];
      }
    },
  },
  methods: {
    // Metodo para actualizar Vuelo
    async updateViaje (){
      const data = { ...this.formData };
      const response = await axios.put(`http://localhost:9999/api/v1/viaje/update/${this.viaje.idReservaViaje}`, {
        fecha: this.selectedDate,
        idReservaHotel: this.selectedHotel.idReservaHotel,
        idViaje: this.selectedFlight.idViaje,
        idAlquiler: this.selectedCar.idAlquiler,
        idAtraccion: this.selectedAttraction.idAtraccion,
        idActividad: this.selectedActivity.idActividad,
        idCliente: this.selectedClient.idCliente,
        idSeguro: this.selectedInsurance.idSeguro
      });
      console.log("Vuelo updated");
      this.$emit('update');
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
    selectHotel(hotel) {
      this.selectedHotel = hotel;
      this.showHotelModal = false;
    },
    selectFlight(flight) {
      this.selectedFlight = flight;
      this.showFlightModal = false;
    },
    selectCar(car) {
      this.selectedCar = car;
      this.showCarModal = false;
    },
    selectAttraction(attraction) {
      this.selectedAttraction = attraction;
      this.showAttractionModal = false;
    },
    selectActivity(activity) {
      this.selectedActivity = activity;
      this.showActivityModal = false;
    },
    selectClient(client) {
      this.selectedClient = client;
      this.showClientModal = false;
    },
    selectInsurance(insurance) {
      this.selectedInsurance = insurance;
      this.showInsuranceModal = false;
    },
    loadDefaultHotel() {
      const defaultHotel = this.reservaHoteles.find(hotel => hotel.idReservaHotel === this.defaultHotelId);
      //console.log('Default hotel:');
      //console.log(defaultHotel);
      if (defaultHotel) {
        this.selectedHotel = defaultHotel;
      }
    },
    loadDefaultFlight() {
      const defaultFlight = this.vuelos.find(flight => flight.idViaje === this.defaultFlightId);
      //console.log('Default flight:');
      //console.log(defaultFlight);
      if (defaultFlight) {
        this.selectedFlight = defaultFlight;
      }
    },
    loadDefaultCar() {
      const defaultCar = this.alquileresAuto.find(car => car.idAlquiler === this.defaultCarId);
      //console.log('Default car:');
      //console.log(defaultCar);
      if (defaultCar) {
        this.selectedCar = defaultCar;
      }
    },
    loadDefaultAttraction() {
      const defaultAttraction = this.atracciones.find(attraction => attraction.idAtraccion === this.defaultAttractionId);
      //console.log('Default attraction:');
      //console.log(defaultAttraction);
      if (defaultAttraction) {
        this.selectedAttraction = defaultAttraction;
      }
    },
    loadDefaultActivity() {
      const defaultActivity = this.actividades.find(activity => activity.idActividad === this.defaultActivityId);
      //console.log('Default activity:');
      //console.log(defaultActivity);
      if (defaultActivity) {
        this.selectedActivity = defaultActivity;
      }
    },
    loadDefaultClient() {
      const defaultClient = this.clientes.find(client => client.idCliente === this.defaultClientId);
      //console.log('Default client:');
      //console.log(defaultClient);
      if (defaultClient) {
        this.selectedClient = defaultClient;
      }
    },
    loadDefaultInsurance() {
      const defaultInsurance = this.seguros.find(insurance => insurance.idSeguro === this.defaultInsuranceId);
      //console.log('Default insurance:');
      //console.log(defaultInsurance);
      if (defaultInsurance) {
        this.selectedInsurance = defaultInsurance;
      }
    },

    deselectHotel() {
      this.selectedHotel = null;
    },
    deselectFlight() {
      this.selectedFlight = null;
    },
    deselectCar() {
      this.selectedCar = null;
    },
    deselectAttraction() {
      this.selectedAttraction = null;
    },
    deselectActivity() {
      this.selectedActivity = null;
    },
    deselectClient() {
      this.selectedClient = null;
    },
    deselectInsurance() {
      this.selectedInsurance = null;
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
  width: 80%;
  max-height: 80vh; /* Limita la altura máxima del modal */
  overflow: hidden; /* Oculta el contenido desbordante */
  position: relative;
}

.scrollable-content {
  max-height: 50vh; /* Ajusta el tamaño para dejar espacio para otros elementos */
  overflow-y: auto; /* Agrega la barra de desplazamiento vertical */
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

.date-input {
  margin-bottom: 20px;
}

.sections-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.section-item {
  margin-bottom: 20px;
}

.panel {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  margin-top: 10px;
}

.info {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
  margin-right: 10px;
}

.column:last-child {
  margin-right: 0;
}

.create-button:active {
  background-color: #b36f03;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.create-button:hover {
  background-color: #f3b05f;
  color: white;
}

.create-button {
  margin-top: 10px;
  margin-bottom: 0px;
  background-color: #f48f00;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  box-shadow: 0 9px #999;
}
</style>

