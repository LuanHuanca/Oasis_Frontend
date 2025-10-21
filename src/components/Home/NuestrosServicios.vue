<template>
  <section class="NuestrosServicios" aria-labelledby="servicios-title">
    <div class="container">
      <header class="header">
  <h2 id="servicios-title">Nuestros Servicios</h2>
  <p class="lead">Servicios pensados para que viajes tranquilo, con calidad, seguridad y al mejor precio.</p>
      </header>

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
          titulo="Al mejor precio garantizado"
          descripcion="Si encuentras viajes más baratos que los nuestros, te compensaremos la diferencia."
        />
      </div>
    </div>
  </section>
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
.NuestrosServicios{
  background: linear-gradient(180deg, #ffffff, #f6fbff);
  padding: 40px 16px;
}
.NuestrosServicios .container{
  max-width: 1100px;
  margin: 0 auto;
}
.header{
  text-align: center;
  margin-bottom: 20px;
}
.header h2{ margin:0; font-size:24px; }
.header .lead{ color: #6b7280; margin-top:6px; }

.tarjetas-servicios-contenedor{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.tarjetas-servicios-contenedor ::v-deep > * {
  transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease;
  display: flex; /* asegurar que el componente hijo pueda alinearse correctamente */
}

.tarjetas-servicios-contenedor ::v-deep > *:hover{
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 18px 36px rgba(7,31,70,0.12);
}

/* Forzar layout: icono a la izquierda y contenido a la derecha dentro de TarjetaServicios */
.tarjetas-servicios-contenedor ::v-deep .TarjetaServicio{
  flex-direction: row;
  align-items: center;
}

@media (max-width: 960px){
  .tarjetas-servicios-contenedor{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px){
  .tarjetas-servicios-contenedor{ grid-template-columns: 1fr; }
}
</style>
