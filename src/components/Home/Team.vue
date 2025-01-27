<template>
  <div class="Team-contenedor">
    <h2>Nuestro Equipo de Trabajo</h2>
    <br />
    <div class="Tarjetas-team-contenedor">
      <TarjetaTeam
        imagen="src/assets/Home/team/Caro.jpg"
        nombre="Ana Carolina Zeballos"
        cargo="Analista de calidad"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59169851888"
        githubLink="https://github.com/CaroZeballos"
      />
      <TarjetaTeam
        imagen="src/assets/Home/team/Max.jpg"
        nombre="Max Pasten"
        cargo="Scrum Master"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59168171114"
        githubLink="https://github.com/Max-APL"
      />
      <TarjetaTeam
        imagen="src/assets/Home/team/Marco.jpg"
        nombre="Marco Reynolds"
        cargo="Product Owner"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59177744161"
        githubLink="https://github.com/MARCK-J"
      />
      <TarjetaTeam
        imagen="src/assets/Home/team/Luan.jpeg"
        nombre="Luan Huanca"
        cargo="Desarrollador"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59173037172"
        githubLink="https://github.com/LuanHuanca"
      />
      <TarjetaTeam
        imagen="src/assets/Home/team/Nyc.jpeg"
        nombre="Nyc Callizaya"
        cargo="Diseñador UI/UX"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59161141864"
        githubLink="https://github.com/NycKev"
      />
      <TarjetaTeam
        imagen="src/assets/Home/team/Andy.jpeg"
        nombre="Andy Calle"
        cargo="Diseñador UI/UX"
        mensajeLink="#"
        whatsappLink="https://wa.me/+59167337632"
        githubLink="https://github.com/andy145235"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TarjetaTeam from "./TarjetaTeam.vue";

export default {
  components: {
    TarjetaTeam,
  },
};
</script>
<style>
.Team-contenedor {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.Tarjetas-team-contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}
@media (max-width: 600px) {
  .Tarjetas-team-contenedor {
    flex-direction: column;
    align-items: center;
  }
  .Team-contenedor h2 {
    font-size: 30px;
  }
}
</style>
