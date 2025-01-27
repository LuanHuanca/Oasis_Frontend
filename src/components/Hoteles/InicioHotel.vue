<template>
    <div>
      <div class="content">
          <div class="search">
              <input type="text" id="searchInput" placeholder="      Nombre del destino o hotel..." onfocus="hideSearchElements()">
              <input type="date" style="right: 100px; top: 6px;">
              <button style="right: 0px; top: 12px;">Buscar</button>
              <img id="searchIcon" class="search-icon" src="@/assets/Hotel/lupa.png" alt="Icono Lupa" width="10" height="10" onclick="hideSearchElements()">
          </div>
          <div class="centered-text">Alojate en algun sitio Increible</div>
      </div>
      <div class="second-image">
          <img src="@/assets/Hotel/imagen1.jpg" alt="Segunda Imagen">
          <div class="additional-text">Los mejores hoteles de toda <br>Latinoamérica </div>
          <div class="additional-text-small">Descubre los mejores hoteles, elegidos para ti</div>
      </div>
      <div class="footer">
          <p>¡Alíjate en un sitio increíble!</p>
      </div>
      <div class="container">
        <h1>Los hoteles más populares para tus próximas vacaciones</h1>
        <p>Estos son algunos hoteles que han visitado otros viajeros:</p>
        <div class="image-row">
          <div class="image-container" v-for="(hotel, index) in hotels" :key="index">
            <img :src="hotel.image" :alt="`Hotel ${index + 1}`">
            <span class="image-name">{{ hotel.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import hotel1 from '@/assets/Hotel/hotel1.jpg';
  import hotel2 from '@/assets/Hotel/hotel2.jpg';
  import hotel3 from '@/assets/Hotel/hotel3.jpg';
  import hotel4 from '@/assets/Hotel/hotel4.jpg';
  import hotel5 from '@/assets/Hotel/hotel5.jpg';
  import hotel6 from '@/assets/Hotel/hotel6.jpg';
  import hotel7 from '@/assets/Hotel/hotel7.jpg';
  import hotel8 from '@/assets/Hotel/hotel8.jpg';
  import hotel9 from '@/assets/Hotel/hotel9.jpg';
  import hotel10 from '@/assets/Hotel/hotel10.jpg';
  import hotel11 from '@/assets/Hotel/hotel11.jpg';
  import hotel12 from '@/assets/Hotel/hotel12.jpg';
  import hotel13 from '@/assets/Hotel/hotel13.jpg';
  import hotel14 from '@/assets/Hotel/hotel14.jpg';
  import hotel15 from '@/assets/Hotel/hotel15.jpg';
  import hotel16 from '@/assets/Hotel/hotel16.jpg';
  
  export default {
    data() {
      return {
        hotels: [
          { name: 'Sumerville All Inclusive Resort', image: hotel1 },
          { name: 'Salinas Margogi All Inclusive Resort', image: hotel2 },
          { name: 'Japaratinga Lounge Resort', image: hotel3 },
          { name: 'Fairmont Rio de Janeiro Copacabana', image: hotel4 },
          { name: 'Four Seasons Buenos Aires', image: hotel5 },
          { name: 'Elcielo Colombia', image: hotel6 },
          { name: 'Emiliano Rio de Janeiro Brasil', image: hotel7 },
          { name: 'Hotel Eurobuilding Caracas Venezuela', image: hotel8 },
          { name: 'Hotel Fasano Belo Horizonte Brasil', image: hotel9 },
          { name: 'Hyatt Centric San Isidro Lima Peru', image: hotel10 },
          { name: 'Intercontinental Real Santo Domingo Republica Dominicana', image: hotel11 },
          { name: 'Live Aqua Urban Resort Monterrey, Mexico', image: hotel12 },
          { name: 'Los Tajibos, a Tribute Portfolio Hotel Santa Cruz, Bolivia', image: hotel13 },
          { name: 'Mandarin Oriental de Santiago Santiago de Chile', image: hotel14 },
          { name: 'W Bogota Colombia', image: hotel15 },
          { name: 'Hilton Guadalajara Midtown Mexico', image: hotel16 },
        ]
      };
    },
    methods: {
      hideSearchElements() {
        document.getElementById("searchIcon").style.opacity = "0";
        document.getElementById("searchInput").value = "";
      }
    }
  };
  </script>
  
  <style scoped>
  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }


  .content {
    background-image: url('@/assets/Hotel/imagen2.jpg');
    background-size: cover;
    background-position: center;
    height: calc(100vh - 140px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    color: white;
  }
  
  .search {
    position: relative;
    max-width: 620px;
    width: 50%;
  }
  
  .search input[type="text"] {
    width: calc(100% - 30px);
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 5px 30px 5px 10px;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .search input[type="date"],
  .search button {
    position: absolute;
    top: 50px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 4px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .search input[type="date"] {
    right: -200px;
  }
  
  .search button {
    right: -280px;
    background-color: rgb(82, 165, 82);
    color: white;
    cursor: pointer;
  }
  
  .search .search-icon {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    filter: grayscale(100%);
    transition: opacity 0.3s ease;
    top: 15px;
  }
  
  .footer {
    display: none;
  }
  
  .centered-text {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }
  
  .second-image {
    margin-top: 30px; 
    text-align: center;
    position: relative;
  }
  
  .second-image img {
    width: 90%; 
    height: auto; 
    border-radius: 20px; 
  }
  
  .additional-text {
    position: absolute;
    top: 80px;
    left: 90px; 
    color: white;
    font-weight: bold;
    font-size: 40px;
  }
  
  .additional-text-small {
    position: absolute;
    top: 180px;
    left: 100px; 
    color: white;
    font-size: 14px;
    font-weight: lighter;
  }
  
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
  </style>