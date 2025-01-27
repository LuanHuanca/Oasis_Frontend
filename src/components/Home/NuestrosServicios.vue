<template>
  <div class="NuestrosServicios-content">
    <h2>Nuestros Servicios</h2>
    <br/>
    <div class="tarjetas-servicios-contenedor">
        <TarjetaServicios
        icono="fluent-mdl2:personalize"
        titulo="Emparejamiento personalizado"
        descripcion="Nuestro exclusivo sistema de combinación le permite encontrar el recorrido que desea para sus próximas vacaciones."
        />
        <TarjetaServicios
        icono="mdi:medal"
        titulo="Amplia Variedad de viajes"
        descripcion="Ofrecemos una amplia variedad de viajes seleccionados personalmente con destinos a toda Bolivia"
        />
        <TarjetaServicios
        icono="ion:star-sharp"
        titulo="Servicio Altamente Calificado"
        descripcion="Nuestros tour managers están calificados, capacitados y amigables para brindarle el mejor servicio."
        />
        <TarjetaServicios
        icono="gala:secure"
        titulo="Viajes seguros"
        descripcion="En nuestra agencia ofrecemos una variedad de viajes seguros y amigables para nuestros clientes."
        />
        <TarjetaServicios
        icono="fontisto:hotel-alt"
        titulo="Hoteles cuidadosamente seleccionados"
        descripcion="Nuestro equipo ofrece sólo la mejor selección de hoteles accesibles y de lujo a nuestros clientes."
        />
        <TarjetaServicios
        icono="et:wallet"
        titulo="Mejor precio garantizado"
        descripcion="Si encuentras viajes más baratos que los nuestros, te compensaremos la diferencia."
        />
    </div>
  </div>
</template>

<script lang="ts">
import TarjetaServicios from "./TarjetaServicios.vue";

export default {
  components: {
    TarjetaServicios,
  },
};
</script>
<style>
.NuestrosServicios-content {
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tarjetas-servicios-contenedor {
  display: flex;
  flex-wrap: wrap; 
  gap: 20px; /* Espacio entre las tarjetas */
  justify-content: center; 
}
@media (max-width: 600px) {
  .tarjetas-servicios-contenedor {
    flex-direction: column;
    align-items: center;
  }
}
</style>
