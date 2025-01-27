<template>
  <div class="container">
    <h1>Los hoteles más populares para tus próximas vacaciones</h1>
    <p>Estos son algunos hoteles que han visitado otros viajeros:</p>
    <div class="image-row" v-for="(row, index) in filteredHotelRows" :key="index">
      <div class="image-container" v-for="hotel in row" :key="hotel.name" @click="goToHotelDetails(hotel.link)">
        <img :src="hotel.image" :alt="hotel.name">
        <span class="image-name">{{ hotel.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PopularHotels',
  data() {
    return {
      hotels: [],
      cityMap: {
        1: 'La Paz',
        2: 'Santa Cruz de la Sierra',
        3: 'Cochabamba',
        4: 'Sucre',
        5: 'Oruro',
        6: 'Potosí',
        7: 'Tarija' ,
        8: 'Beni',
        9: 'Pando',
      },
    };
  },
  computed: {
    filteredHotelRows() {
      const rows = [];
      const selectedCity = this.$store.getters.selectedCity || 'all';
      const filteredHotels = selectedCity === 'all' ? this.hotels : this.hotels.filter(hotel => hotel.cityName === selectedCity);
      for (let i = 0; i < filteredHotels.length; i += 4) {
        rows.push(filteredHotels.slice(i, i + 4));
      }
      return rows;
    }
  },
  methods: {
    goToHotelDetails(link) {
      this.$router.push(link);
    },
    fetchHotels() {
      axios.get('http://localhost:9999/api/v1/hotel')
        .then(response => {
          this.hotels = response.data.result.map(hotel => ({
            name: hotel.hotel,
            image: hotel.imagenes,
            link: `/hotel/${hotel.idHotel}`,
            city: hotel.idCiudad,
            cityName: this.cityMap[hotel.idCiudad],
          }));
        })
        .catch(error => {
          console.error("Hubo un error al obtener los hoteles:", error);
        });
    }
  },
  created() {
    this.fetchHotels();
  }
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

.image-city {
  font-size: 14px;
  margin-top: 5px;
}

h1 {
  font-size: 30px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
