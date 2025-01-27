<template>
  <div>
    <NavBar/>
    <pantalla-ordenar/>



  </div>
</template>

<script>



import PantallaOrdenar from "../../components/Auto/PantallaOrdenar.vue";
import NavBar from "../../components/NavBar.vue";


export default {
  name: "Autos",
  components: {
    NavBar,
    PantallaOrdenar,

  },
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
