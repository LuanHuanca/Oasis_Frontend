<template>
  <div>
    <Inicio/>
    <Informacion/>
    <Carusel/>
    <NuestrosServicios/>
    <NuestrosViajes/>
    <!--<Team/>-->
    <Contactanos/>
    <Ubicacion/>
    <ChatAssistant />
  </div>
</template>

<script lang="ts">
import NuestrosServicios from "../components/Home/NuestrosServicios.vue";
import Inicio from "../components/Home/Inicio.vue"
import NuestrosViajes from "../components/Home/NuestrosViajes.vue"
// import Team from "../components/Home/Team.vue";
import Contactanos from "../components/Home/Contactanos.vue";
import Ubicacion from "../components/Home/Ubicacion.vue";
import NavBar from "../components/NavBar.vue";
import Carusel from '../components/Home/Carusel.vue'
import Informacion from "../components/Home/Informacion.vue";
import ChatAssistant from '../components/Chatbot/ChatAssistant.vue';

export default {
  name: "home-view",
  components: { 
    NavBar,
    Inicio,
    NuestrosServicios,
    NuestrosViajes,
    //Team,
    Contactanos,
    Ubicacion,
    Carusel,
    Informacion,
    ChatAssistant,
  },
};
</script>
