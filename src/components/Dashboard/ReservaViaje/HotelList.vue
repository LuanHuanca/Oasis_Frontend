<template>
  <div class="HotelList-Container">
    <h3>Selecciona una Reserva de Hotel</h3>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nro Reserva</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
        <th>Hotel</th>
        <th>Precio</th>
        <th>Personas</th>
        <th>Habitaciones</th>
        <th>Ciudad</th>
        <th>País</th>
        <th>Detalle</th>
        <th>Acción</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reservaHotel in reservaHoteles" :key="reservaHotel.idReservaHotel">
        <td>{{ reservaHotel.idReservaHotel }}</td>
        <td>{{ reservaHotel.nroReservaHotel }}</td>
        <td>{{ reservaHotel.fechaInicio }}</td>
        <td>{{ reservaHotel.fechaFin }}</td>
        <td>{{ reservaHotel.hotel }}</td>
        <td>{{ reservaHotel.precio }}</td>
        <td>{{ reservaHotel.personas }}</td>
        <td>{{ reservaHotel.habitaciones }}</td>
        <td>{{ reservaHotel.ciudad }}</td>
        <td>{{ reservaHotel.pais }}</td>
        <td>{{ reservaHotel.detalle }}</td>
        <td><button @click="selectHotel(reservaHotel)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['reservaHoteles'],
  methods: {
    selectHotel(reservaHotel) {
      this.$emit('select-hotel', reservaHotel);
    }
  }
};
</script>

<style scoped>
.HotelList-Container{
  overflow-x: auto; /* Agregar desplazamiento horizontal en pantallas pequeñas */
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
