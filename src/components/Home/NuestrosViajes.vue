<template>
    <div class="nuestros-viajes-contenedor">
        <h2>Nuestros viajes</h2>
        <br/>
        <div class="tarjetas-viajes-contenedor">
            <TarjetaViajes
            imagen="src/assets/Home/travels/Peru.png"
            alt="Viaje a peru"
            titulo="Vive la magia de Peru"
            duracion="Viaje de 8 dias y 7 noches"
            paises="Peru"
            ciudades="Lima, Cusco, Machu Pichu"
            />
            <TarjetaViajes
            imagen="src/assets/Home/travels/Colombia.png"
            alt="Viaje a Colombia"
            titulo="Con sabor a Colombia"
            duracion="Viaje de 8 dias y 7 noches"
            paises="Colombia"
            ciudades="Bogota, Medellin, Cartagena"
            />
            <TarjetaViajes
            imagen="src/assets/Home/travels/Buenos Aires.png"
            alt="Viaje a Buenos Aires"
            titulo="Buenos Aires a su medida"
            duracion="Viaje 8 dias y 7 noches"
            paises="Argentina"
            ciudades="Buenos Aires"
            />
            <TarjetaViajes
            imagen="src/assets/Home/travels/Brasil y Argentina.png"
            alt="Viaje a Brasil y Argentina"
            titulo="Brasil y Argentina"
            duracion="Viaje de 15 dias y 7 noches"
            paises="Brasil"
            ciudades="Buenos Aires, Rio de Janeiro"
            />
        </div>
    </div>
</template>

<script lang="ts">
import TarjetaViajes from "./TarjetaViajes.vue"

export default {
  components: {
    TarjetaViajes,
  },
};
</script>
<style>
.nuestros-viajes-contenedor {
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tarjetas-viajes-contenedor {
    width: 80%;
  display: flex;
  flex-direction: row; 
  gap: 20px;
  justify-content: center; 
}
@media (max-width: 600px) {
    .tarjetas-viajes-contenedor {
    flex-direction: column;
    align-items: center;
    }
}
</style>


