<template>
  <div class="CarList-container">
    <h2>Lista de Autos de Alquiler</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Empresa</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Tipo</th>
        <th>Días</th>
        <th>Precio</th>
        <th>Ciudad</th>
        <th>País</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="alquiler in alquileresAuto" :key="alquiler.idAlquiler">
        <td>{{ alquiler.idAlquiler }}</td>
        <td>{{ alquiler.empresa }}</td>
        <td>{{ alquiler.marca }}</td>
        <td>{{ alquiler.modelo }}</td>
        <td>{{ alquiler.tipo }}</td>
        <td>{{ alquiler.dias }}</td>
        <td>{{ alquiler.precio }}</td>
        <td>{{ alquiler.ciudad }}</td>
        <td>{{ alquiler.pais }}</td>
        <td><button @click="$emit('select-car', alquiler)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    alquileresAuto: Array
  }
};
</script>

<style>
.CarList-container{
  overflow-x: auto;
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
