<template>
  <div class="ActivityList-container">
    <h2>Lista de Actividades</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Actividad</th>
        <th>Fecha</th>
        <th>Precio</th>
        <th>Categoría</th>
        <th>Ciudad</th>
        <th>País</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="actividad in actividades" :key="actividad.idActividad">
        <td>{{ actividad.idActividad }}</td>
        <td>{{ actividad.actividad }}</td>
        <td>{{ actividad.fecha }}</td>
        <td>{{ actividad.precio }}</td>
        <td>{{ actividad.categoria }}</td>
        <td>{{ actividad.ciudad }}</td>
        <td>{{ actividad.pais }}</td>
        <td><button @click="$emit('select-activity', actividad)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    actividades: Array
  }
};
</script>

<style>
.ActivityList-container{
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
