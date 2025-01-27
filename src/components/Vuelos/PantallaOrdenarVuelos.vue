<template>
    <div class="product-details">
      <div class="product-image">
        <img :src="images[currentImageIndex]" class="car-image" alt="Car Image">
      </div>
      <div class="product-info">
        <div class="header">
          <div class="logo-container">
            <img :src="logoImage" class="logo" alt="Company Logo">
          </div>
          <div class="title-info">
            <div class="title">{{ vueloData.title }}</div>
            <div class="model">{{ vueloData.model }}</div>
            <div class="price">{{ vueloData.pricePerDay }} <span>Después de 3 días rentado</span></div>
          </div>
        </div>
        <div class="info">
          <div class="rental-details">
            <h3>Datos de Renta</h3>
            <div class="detail"><strong>Marca:</strong> {{ vueloData.brand }}</div>
            <div class="detail"><strong>Modelo:</strong> {{ vueloData.model }}</div>
            <div class="detail"><strong>Tipo:</strong> {{ vueloData.type }}</div>

            <ul v-if="showCities" class="city-list">
              <li v-for="city in vueloData.cities" :key="city" class="city-item">{{ city }}</li>
            </ul>
            <div class="detail"><strong>Disponibilidad en:</strong> {{ vueloData.availability }}</div>
          </div>
          <div class="buttons">
            <button class="add-btn" @click="addToCart">
              Agregar <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-description-grid">
      <div class="description">
        <h2>Descripción del Auto</h2>
        <p>
          Este es un vehículo de alta gama disponible para alquiler en todo el país. Ofrece un rendimiento excepcional, comodidad y las últimas tecnologías para una experiencia de conducción inigualable.
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
  data() {
    return {
      vueloData: {
        title: 'Auto en alquiler',
        brand: 'Marca',
        model: 'Modelo Qashqai',
        type: 'Tipo',
        pricePerDay: '300 bs',
        availability: 'Todo el país',
        cities: ['La Paz', 'Cochabamba', 'Santa Cruz'],
        company: 'NISSAN'
      },
      showCities: false,
      images: [
        'https://focus.belfasttelegraph.co.uk/thumbor/Nyyf7H_RQKHly7Sq1kSPURnDzPw=/960x640/smart/prod-mh-ireland/d1d08534-9b73-11ed-b69a-0210609a3fe2',
        'https://www.quadisllansa.es/wp-content/uploads/sites/61/2021/03/Nissan_Qashqai_Premiere_Edition_07.jpg',
      ],
      currentImageIndex: 0,
      map: null // Variable para almacenar el mapa de Google Maps
    };
  },
  computed: {
    logoImage() {
      // Lógica para obtener la imagen del logo
      return 'https://i.pinimg.com/736x/f8/d1/7b/f8d17baba349db2c958bd2d075a8d32e.jpg'; // Logo de ejemplo
    }
  },
  mounted() {
    // Inicializar el mapa cuando el componente está montado
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
        // Si la API de Google Maps no está definida, salir de la función
        return;
      }

      // Inicializar el mapa de Google Maps
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: -16.500, lng: -68.150 }, // Coordenadas de Bolivia
        zoom: 6 // Zoom inicial
      });
    }
  }
};
</script>


<style>
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
  background-color: rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo-container {
  width: 100px;
  height: 100px;
  gap: 10px;

}

.logo {
  width: 1%;
  height: 1%;
}

.title-info {
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color:black;
}

.model {
  font-size: 18px;
  color:black;
}

.price {
  font-size: 18px;
  margin-bottom: 10px;
  color:black;
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

.description, .map-container {
  flex: 1 1 48%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 300px;
}

.description .h2{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.map-container iframe {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
    align-items: center;
  }

  .product-image, .product-info {
    width: 100%;
    max-width: 600px;
  }

  .carousel-buttons {
    position: relative;
    top: auto;
    transform: none;
    justify-content: space-between;
    margin-top: 10px;
  }

  .product-description-grid {
    flex-direction: column;

  }

  .description h2,
  .description p {
    margin-top: -10px; /* Puedes ajustar este valor según sea necesario */
  }

  .description, .map-container {
    width: 100%;
    margin-bottom: 20px;

  }
}
</style>
