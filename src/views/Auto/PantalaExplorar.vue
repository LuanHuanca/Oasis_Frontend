<template>
  <div>
    <NavBar/>
    <ExplorarNissan/>




  </div>
</template>

<script>


import ExplorarNissan from "../../components/Auto/Empresas/Nissan/ExplorarNissan.vue";

import NavBar from "../../components/NavBar.vue";


export default {
  name: "Autos",
  components: {
    NavBar,
    ExplorarNissan,
  },
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
