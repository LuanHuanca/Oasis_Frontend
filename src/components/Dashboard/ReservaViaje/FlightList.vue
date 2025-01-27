<template>
  <div class="FlightList-container">
    <h2>Lista de Vuelos</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nro Reserva</th>
        <th>Origen</th>
        <th>Destino</th>
        <th>Aerolínea</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
        <th>Precio</th>
        <th>Personas</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="vuelo in vuelos" :key="vuelo.idViaje">
        <td>{{ vuelo.idViaje }}</td>
        <td>{{ vuelo.nroReserva }}</td>
        <td>{{ vuelo.ciudad_origen }} - {{ vuelo.pais_origen }}</td>
        <td>{{ vuelo.ciudad_destino }} - {{ vuelo.pais_destino }}</td>
        <td>{{ vuelo.aerolinea }}</td>
        <td>{{ vuelo.fechaInicio }}</td>
        <td>{{ vuelo.fechaFin }}</td>
        <td>{{ vuelo.precio }}</td>
        <td>{{ vuelo.personas }}</td>
        <td><button @click="$emit('select-flight', vuelo)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    vuelos: Array
  }
};
</script>

<style>
.FlightList-container{
  overflow-x: auto; /* Agregar desplazamiento horizontal en pantallas pequeñas */
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
