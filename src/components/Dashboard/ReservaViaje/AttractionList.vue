<template>
  <div class="AttractionList-container">
    <h2>Lista de Atracciones</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Atracción</th>
        <th>Precio</th>
        <th>Categoría</th>
        <th>Ciudad</th>
        <th>País</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="atraccion in atracciones" :key="atraccion.idAtraccion">
        <td>{{ atraccion.idAtraccion }}</td>
        <td>{{ atraccion.atraccion }}</td>
        <td>{{ atraccion.precio }}</td>
        <td>{{ atraccion.categoria }}</td>
        <td>{{ atraccion.ciudad }}</td>
        <td>{{ atraccion.pais }}</td>
        <td><button @click="$emit('select-attraction', atraccion)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    atracciones: Array
  }
};
</script>

<style>
.AttractionList-container{
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
