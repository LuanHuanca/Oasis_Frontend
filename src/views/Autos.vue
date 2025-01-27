<template>
  <div>
    <CarruselAuto/>
    <PopularAutos/>
    <FooterAutos/>    
  </div>
</template>

<script>
import InicioAuto from '../components/AutoScreen/InicioAuto.vue';
import CarruselAuto from '../components/AutoScreen/CarruselAutos.vue';
import PopularAutos from '../components/AutoScreen/PopularAutos.vue';
import FooterAutos from '../components/AutoScreen/FooterAutos.vue';


export default {
  name: "Autos",
  components: {
    CarruselAuto,
    InicioAuto,
    PopularAutos,
    FooterAutos,
  },
};
</script>
