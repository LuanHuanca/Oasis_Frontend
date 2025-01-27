<template>
  <div class="verificacion">
    <router-link to="/login" class="back-link">Regresar</router-link>
    <TarjetaVerificacion />
  </div>
</template>

<script>
import TarjetaVerificacion from "../components/Verificacion/TarjetaVerificacion.vue";

export default {
  name: "verificacion-view",
  components: {
    TarjetaVerificacion,
  },
};
</script>

<style>
.verificacion {
  background: url(https://laliniciativablog.wordpress.com/wp-content/uploads/2015/01/day-11.jpg);
  width: 100%;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.back-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: black;
  background-color: rgb(158, 229, 229);
  text-decoration: none;
  font-size: 18px;
  padding: 10px 30px;
  border: 1px solid black;
  border-radius: 15px;
}
</style>
