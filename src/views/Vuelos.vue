<template>
  <div>
    <CarouselVuelos/>
    <Service/>
    <PopularVuelos/>
    <About />
    <a
      href="#/vuelos"
      class="btn btn-lg btn-primary btn-lg-square back-to-top"
      @click="scrollToTop"
    >
      <i class="fa fa-angle-double-up"></i>
    </a>
    <Footer />
  </div>
</template>

<script>

import CarouselVuelos from "../components/Vuelos/CarruselVuelos.vue";
import PopularVuelos from "../components/Vuelos/PopularVuelos.vue";
import About from "../components/Vuelos/About.vue";

import Service from "../components/Vuelos/Service.vue";
import Packages from "../components/Vuelos/Packages.vue";
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    NavBar,
    CarouselVuelos,
    PopularVuelos,
    About,
    Service,
    Packages,
    Footer,
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
