<template>
  <div id="app" class="FormRegisterVue">
    <h1>Formulario de Agencia de Viajes</h1>

    <div class="date-input">
      <label for="date">Seleccione una fecha:</label>
      <input type="date" id="date" v-model="selectedDate" required>
    </div>

    <div class="sections-containerF">
      <section class="section-item">
        <h2>Hotel</h2>
        <button class="selection-button" @click="showHotelModal = true">Seleccionar Hotel</button>
        <div v-if="selectedHotel" class="panel">
          <h3>Hotel Seleccionado</h3>
          <div class="info">
            <div class="column">
              <p><strong>ID:</strong> {{ selectedHotel.idReservaHotel }}</p>
              <p><strong>Nro Reserva:</strong> {{ selectedHotel.nroReservaHotel }}</p>
              <p><strong>Fecha Inicio:</strong> {{ selectedHotel.fechaInicio }}</p>
              <p><strong>Fecha Fin:</strong> {{ selectedHotel.fechaFin }}</p>
              <p><strong>Hotel:</strong> {{ selectedHotel.hotel }}</p>
              <p><strong>Precio:</strong> {{ selectedHotel.precio }}</p>
            </div>
            <div class="column">
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
        <button class="selection-button" @click="showFlightModal = true">Seleccionar Vuelo</button>
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
        <button class="selection-button" @click="showCarModal = true">Seleccionar Auto</button>
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
        <button class="selection-button" @click="showAttractionModal = true">Seleccionar Atracción</button>
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
        <button class="selection-button" @click="showActivityModal = true">Seleccionar Actividad</button>
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
        <button class="selection-button" @click="showClientModal = true">Seleccionar Cliente</button>
        <div v-if="selectedClient" class="panel">
          <h3>Cliente Seleccionado</h3>
          <div class="info">
            <div class="column">
              <p><strong>ID:</strong> {{ selectedClient.idCliente }}</p>
              <p><strong>Correo:</strong> {{ selectedClient.correo }}</p>
              <p><strong>Estado Cuenta:</strong> {{ selectedClient.estadoCuenta === true ? 'Activo' : (selectedClient.estadoCuenta === false ? 'Inactivo' : '') }}</p>
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
        <button class="selection-button" @click="showInsuranceModal = true">Seleccionar Seguro</button>
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
    <h2></h2>

    <div style="display: flex; justify-content: space-between; align-items: center;">
      <button class="create-button" @click="registrarReserva()">Ver Cotización</button>
      <button class="create-button" @click="facturacion()">Facturar Reserva de Viaje</button>

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



    <!-- Modal de Cotización -->

    <modal :isOpen="showQuoteModal" @close="showQuoteModal = false">
      <quote-modal :quoteInfo="quoteInfo" @close="showQuoteModal = false"></quote-modal>
    </modal>

    <modal :isOpen="showRegistroModal" @close="showRegistroModal = false">
      <registro-reserva :quoteInfo="quoteInfo" @close="showRegistroModal = false"></registro-reserva>
    </modal>


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
import QuoteModal from './QuoteModal.vue';
import RegistroReserva from "./RegistroReserva.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  components: {
    HotelList,
    FlightList,
    CarList,
    AttractionList,
    ActivityList,
    ClientList,
    InsuranceList,
    Modal,
    QuoteModal,
    RegistroReserva,

  },
  data() {
    return {
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
      showQuoteModal: false,
      showRegistroModal: false,
      quoteInfo: {} // Aquí almacenaremos la información de facturación para pasar al modal de cotización
    };
  },

  async created() {
    this.quoteInfo = {};
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

  },

  methods: {
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

    async facturacion() {

      // Registrar Reserva de viaje
      await this.RegistrarReserva();

      // Enviar solicitud para obtener el id del ultimo viaje
      const response2 = await axios.get(
          "http://localhost:9999/api/v1/viaje/lastId"
      );
      const lastViaje = response2.data.result;
      console.log("Last viaje", lastViaje);


      // Verificar si todas las selecciones están hechas
      if (
          this.selectedDate &&
          this.selectedHotel &&
          this.selectedFlight &&
          this.selectedCar &&
          this.selectedAttraction &&
          this.selectedActivity &&
          this.selectedClient &&
          this.selectedInsurance
      ) {
        // Llenar la información de la cotización
        this.quoteInfo = {
          fecha: this.selectedDate,
          hotel: this.selectedHotel,
          vuelo: this.selectedFlight,
          auto: this.selectedCar,
          atraccion: this.selectedAttraction,
          actividad: this.selectedActivity,
          cliente: this.selectedClient,
          seguro: this.selectedInsurance,
          idReservaViaje: lastViaje,
        };
        this.showRegistroModal = true;
      } else {
        // Mostrar mensaje de error o manejar de otra manera si no se han seleccionado todos los datos
        await Swal.fire({
          icon: "error",
          title: "Incompleto",
          text: "Por favor, complete todas las selecciones antes de continuar.",
        });

      }
    },
    async registrarReserva() {
      console.log("ENTRA");
      // Verificar si todas las selecciones están hechas
      if (
          this.selectedDate &&
          this.selectedHotel &&
          this.selectedFlight &&
          this.selectedCar &&
          this.selectedAttraction &&
          this.selectedActivity &&
          this.selectedClient &&
          this.selectedInsurance
      ) {
        console.log("Se ingresan datos");

        // Llenar la información de la cotización
        this.quoteInfo = {
          fecha: this.selectedDate,
          hotel: this.selectedHotel,
          vuelo: this.selectedFlight,
          auto: this.selectedCar,
          atraccion: this.selectedAttraction,
          actividad: this.selectedActivity,
          cliente: this.selectedClient,
          seguro: this.selectedInsurance
        };
        console.log("quoteInfo", this.quoteInfo.fecha);
        console.log("quoteInfo", this.quoteInfo.hotel);
        console.log("quoteInfo", this.quoteInfo.vuelo);
        console.log("quoteInfo", this.quoteInfo.auto);
        console.log("quoteInfo", this.quoteInfo.atraccion);
        console.log("quoteInfo", this.quoteInfo.actividad);
        console.log("quoteInfo", this.quoteInfo.cliente);
        console.log("quoteInfo", this.quoteInfo.seguro);

        this.showQuoteModal = true;
      } else {
        // Mostrar mensaje de error o manejar de otra manera si no se han seleccionado todos los datos
        alert('Por favor, complete todas las selecciones antes de continuar.');
      }
    },

    async RegistrarReserva() {

      // Imprimir id de seleciones
      console.log("Fecha " + this.selectedDate);
      console.log("Id de Hotel " + this.selectedHotel.idReservaHotel);
      console.log("Id de Vuelo " + this.selectedFlight.idViaje);
      console.log("Id de Auto " + this.selectedCar.idAlquiler);
      console.log("Id de Atraccion " + this.selectedAttraction.idAtraccion);
      console.log("Id de Actividad " + this.selectedActivity.idActividad);
      console.log("Id de Cliente " + this.selectedClient.idCliente);
      console.log("Id de Seguro " + this.selectedInsurance.idSeguro);

      // Enviar solicitud para crear un nuevo administrador
      const response3 = await axios.post('http://localhost:9999/api/v1/viaje/create', {

        fecha: this.selectedDate,
        idReservaHotel: this.selectedHotel.idReservaHotel,
        idViaje: this.selectedFlight.idViaje,
        idAlquiler: this.selectedCar.idAlquiler,
        idAtraccion: this.selectedAttraction.idAtraccion,
        idActividad: this.selectedActivity.idActividad,
        idCliente: this.selectedClient.idCliente,
        idSeguro: this.selectedInsurance.idSeguro

      });



      console.log('Reserva registrada:', {
        fecha: this.selectedDate,
        hotel: this.selectedHotel,
        vuelo: this.selectedFlight,
        alquilerAuto: this.selectedCar,
        atraccion: this.selectedAttraction,
        actividad: this.selectedActivity,
        cliente: this.selectedClient,
        seguro: this.selectedInsurance
      });

      console.log("Reserva created");

    }
  }
};
</script>

<style>

.content {
  justify-content: center;
  margin-top: 30px;
  margin-left: 50px;
}

.date-input {
  margin-top: 20px;
  margin-bottom: 20px;
}

.sections-containerF {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.section-item {
  margin-bottom: 20px;

}

.selection-button {
  background-color: #FCEEDA;
  border-radius: 50px; /* Más redondeado */
  padding: 10px 20px;
  border: none;
  cursor: pointer;
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
@media (max-width: 600px) {
  .FormRegisterVue{
    margin-left: 10%;
  }
}
.FormRegisterVue {

  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.date-input {
  margin-bottom: 20px;
}



.section-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.section-item h2 {
  margin-top: 0;
}

.selection-button {
  background-color: #f48f00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.panel {
  margin-top: 10px;
}

.info {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
}

.create-button {
  background-color: #f48f00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #f3b05f;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

</style>