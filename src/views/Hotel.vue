<script>
import InicioHotel from "../components/Hoteles/InicioHotel.vue";
import FooterHotel from "../components/Hoteles/FooterHotel.vue";
import PopularHotels from "../components/Hoteles/PopularHotels.vue";
import CarruselHotel from '@/components/Hoteles/CarruselHotel.vue';
export default {
  name: "hotel",
  components: {
    CarruselHotel,
    InicioHotel,
    FooterHotel,
    PopularHotels
  }
};

</script>

<template>
  <div>
    <carrusel-hotel/>
    <popular-hotels/>
    <FooterHotel/>
  </div>
</template>

<style scoped>

</style>