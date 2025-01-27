<template>
  <div class="product-details">
    <div class="product-image">
      <img :src="images[currentImageIndex]" class="car-image" alt="Car Image">
      <div class="carousel-buttons">
        <button @click="prevImage">&#10094;</button>
        <button @click="nextImage">&#10095;</button>
      </div>
    </div>
    <div class="product-info">
      <div class="header">
        <div class="logo-container">
          <img :src="logoImage" class="logo" alt="Company Logo">
        </div>
        <div class="title-info">
          <div class="title">{{ rentalData.title }}</div>
          <div class="model">{{ rentalData.model }}</div>
          <div class="price">
            {{ rentalData.pricePerDay }}
            <span>Después de 3 días rentado</span>
            <div class="stars">
              <span v-for="star in filledStars" :key="star">&#9733;</span>
              <span v-for="star in emptyStars" :key="star" class="empty">&#9733;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="rental-details">
          <h3>Datos de Hotel</h3>
          <div class="detail"><strong>Habitaciones:</strong> {{ rentalData.brand }}</div>
          <div class="detail"><strong>Pisos:</strong> {{ rentalData.type }}</div>

          <ul v-if="showCities" class="city-list">
            <li v-for="city in rentalData.cities" :key="city" class="city-item">{{ city }}</li>
          </ul>

          <div class="popular-services">
            <h2>Servicios más populares</h2>
            <div class="services">
              <div class="service" v-for="service in services" :key="service.name">
                <i :class="service.icon"></i>
                <span>{{ service.name }}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  <div class="product-description-grid">
    <div class="description">
      <h2>Descripción de Hotel</h2>
      <p>
        Salinas Maragogi All Inclusive Resort es una excelente elección para quienes buscan una escapada tropical con todas las comodidades y servicios de un resort de primera categoría. Su ubicación impresionante, combinada con una amplia gama de actividades y opciones gastronómicas, lo convierte en el destino ideal para familias, parejas y viajeros que buscan relajarse y disfrutar de la belleza natural de Maragogi.
      </p>
    </div>
    <div class="map-container">
      <iframe
          width="100%"
          height="100%"
          frameborder="0"
          style="border:0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247917.06217277436!2d-68.26904767966284!3d-16.507451398070098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910f86768f0b5f75%3A0xc0e314ee8b76d558!2sLa%20Paz%2C%20Bolivia!5e0!3m2!1sen!2sus!4v1620050525371!5m2!1sen!2sus"
          allowfullscreen
      ></iframe>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HotelSeleccionado1',
  data() {
    return {
      rentalData: {
        title: 'Salinas Margogi All Inclusive Resort',
        brand: '74',
        type: '6',
        pricePerDay: '300 bs',
        availability: 'Todo el país',
        cities: ['La Paz', 'Cochabamba', 'Santa Cruz'],
        company: 'NISSAN'
      },

      showCities: false,
      images: [
        'src/assets/hotel/salinas1.jpg',
        'src/assets/hotel/salinas2.jpg',
        'src/assets/hotel/salinas3.jpg',
        'src/assets/hotel/salinas4.jpg',
      ],
      currentImageIndex: 0,
      map: null,
      services: [
        { name: ' Piscinas', icon: 'fas fa-swimming-pool' },
        { name: ' Parking gratis', icon: 'fas fa-parking' },
        { name: ' WiFi gratis', icon: 'fas fa-wifi' },
        { name: ' Habitaciones familiares', icon: 'fas fa-users' },
        { name: ' Traslado aeropuerto', icon: 'fas fa-shuttle-van' },
        { name: ' Restaurante', icon: 'fas fa-utensils' },
        { name: ' Habitaciones sin humo', icon: 'fas fa-smoking-ban' },
        { name: ' Bar', icon: 'fas fa-glass-martini-alt' },
        { name: ' Desayuno', icon: 'fas fa-coffee' },
      ],
      filledStars: 4,
      emptyStars: 1
    };
  },
  computed: {
    logoImage() {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png'; // Logo de ejemplo
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    toggleCities() {
      this.showCities = !this.showCities;
    },
    addToCart() {
      alert('El auto ha sido añadido al carrito.');
    },
    prevImage() {
      this.currentImageIndex =
          (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
    nextImage() {
      this.currentImageIndex =
          (this.currentImageIndex + 1) % this.images.length;
    },
    initMap() {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {

        return;
      }

      // Inicializar el mapa de Google Maps
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: -16.500, lng: -68.150 }, // Coordenadas de Bolivia
        zoom: 6
      });
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
}

.product-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
}

.product-image {
  flex: 1 1 60%;
  position: relative;
  margin-top: 10px; /* Ajuste para bajar la imagen */
}

.product-image img {
  width: 100%;
  border-radius: 10px;
}

.carousel-buttons {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-buttons button {
  background-color: rgba(187, 178, 178, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.product-info {
  flex: 1 1 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.54);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #eee;
}

.logo-container {
  width: 100px;
  height: 100px;
  gap: 10px;
}

.logo {
  width: 100%;
  height: auto;
}

.title-info {
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 255, 255);
}

.model {
  font-size: 18px;
  color: rgb(255, 255, 255);
}

.price {
  font-size: 18px;
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
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

.detail {
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
}

.rental-details {
  margin-bottom: 10px;
}

.detail-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
}

.detail-btn:hover {
  background-color: #0056b3;
}

.city-list {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

.city-item {
  margin: 5px 0;
}

.buttons {
  display: flex;
  justify-content: center;
}

.add-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #218838;
}

.add-btn i {
  margin-left: 10px;
}

.product-description-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px;
}

.description,
.map-container {
  flex: 1 1 48%;
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

.map-container iframe {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.popular-services {
  font-family: Arial, sans-serif;
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.service {
  display: flex;
  align-items: center;
  gap: 5px;
}

.service i {
  color: rgb(45, 211, 45);
}
.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.category {
  flex: 1 1 calc(25% - 50px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.category h3 {
  margin-top: 0;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
}

.category h3 i {
  margin-right: 10px;
}

.category ul {
  list-style-type: none;
  padding: 0;
}

.category li {
  margin-bottom: 10px;
}
</style>

