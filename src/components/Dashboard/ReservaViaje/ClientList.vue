<template>
  <div class="ClientList-container">
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Correo</th>
        <th>Estado Cuenta</th>
        <th>ID Persona</th>
        <th>Nombre</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>Teléfono</th>
        <th>Seleccionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cliente in clientes" :key="cliente.idCliente">
        <td>{{ cliente.idCliente }}</td>
        <td>{{ cliente.correo }}</td>
        <td>{{ cliente.estadoCuenta }}</td>
        <td>{{ cliente.idPersona }}</td>
        <td>{{ cliente.nombre }}</td>
        <td>{{ cliente.apellidoP }}</td>
        <td>{{ cliente.apellidoM }}</td>
        <td>{{ cliente.telefono }}</td>
        <td><button @click="$emit('select-client', cliente)">Seleccionar</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    clientes: Array
  }
};
</script>

<style>
.ClientList-container{
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
