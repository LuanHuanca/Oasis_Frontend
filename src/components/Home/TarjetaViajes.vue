<template>
  <div class="tarjeta-viaje">
    <img :src="imagen" :alt="alt" @click="togglePopUp"/>
    <div class="tarjeta-viaje-informacion">
      <h4>{{ titulo }}</h4>
      <p>{{ duracion }}</p>
      <p><strong>Paises:</strong> {{ paises }}</p>
      <p><strong>Ciudades:</strong> {{ ciudades }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    imagen: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "Imagen de viaje",
    },
    titulo: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      default: "Duración del viaje",
    },
    paises: {
      type: String,
      default: "Países visitados",
    },
    ciudades: {
      type: String,
      default: "Ciudades visitadas",
    },
  },
};
</script>

<style>
.tarjeta-viaje {
  border: 2px solid #B5B5B5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.tarjeta-viaje img {
  border-radius: 20px 20px 0 0;
  width: 100%;
  cursor: pointer;
  height: auto;
}
.tarjeta-viaje-informacion {
  padding: 5px 10px;
  font-size: 15px;
}
@media (max-width: 600px) {
  .tarjeta-viaje-informacion {
    font-size: 8px;
  }
}
</style>
