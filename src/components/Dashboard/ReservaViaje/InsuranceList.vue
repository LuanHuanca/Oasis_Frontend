<template>
  <div class="InsuranceList-container">
    <h2>Lista de Seguros</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Seguro</th>
        <th>Cobertura</th>
        <th>Precio</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="seguro in seguros" :key="seguro.idSeguro">
        <td>{{ seguro.idSeguro }}</td>
        <td>{{ seguro.seguro }}</td>
        <td>{{ seguro.cobertura }}</td>
        <td>{{ seguro.precio }}</td>
        <td><button @click="$emit('select-insurance', seguro)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    seguros: Array
  }
};
</script>

<style>
.InsuranceList-container{
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
