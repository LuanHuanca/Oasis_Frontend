<template>
  <div class="dashboard">
    <div class="dashboardTitle">
      <h1  style="font-size: 34px">Comentarios</h1>
    </div>
    <div class="total-registros">

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>ID cliente</th>
          <th>Comentario</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(comentario, index) in comentarios" :key="index">
          <td>{{ comentario.idComentario }}</td>
          <td>{{ comentario.clienteidCliente }}</td>
          <td>{{ comentario.comentario }}</td>


        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'TableComentarios',
  data() {
    return {
      comentarios: [],
    };
  },
  created() {
    this.getComentarios();
  },
  methods: {
    async getComentarios() {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/comentarios`);
        this.comentarios = response.data.result; // Acceder a la propiedad `result` en la respuesta
        console.log('Comentarios cargados exitosamente:', this.comentarios);
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
      }
    },

  }
};

</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.dashboardTitle {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px; /* Ajustar el espacio entre el título y la tabla */
}

.dashboardTitle h1 {
  flex-grow: 1;
  text-align: center;
  font-size: 1.5em; /* Reducir el tamaño del título en pantallas pequeñas */
  color: #333;
}

.dashboardTitle button {
  margin-left: 20px; /* Ajustar el espacio entre el título y el botón */
  border-radius: 20px;
  border: 2px solid black;
  padding: 8px 16px; /* Reducir el tamaño del botón en pantallas pequeñas */
  background-color: rgb(84, 84, 239);
}

.dashboard {
  width: 95%;
  margin: 20px auto;
  text-align: left;
}

.total-registros {
  background-color: #FCEEDA;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  overflow-x: auto; /* Agregar desplazamiento horizontal en pantallas pequeñas */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #FFD28E;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #FFD28E;
}

.create-button:active {
  background-color: #b36f03;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.create-button:hover {
  background-color: #f3b05f;
  color: white;
}

.create-button {
  margin-top: 10px;
  margin-bottom: 0px;
  background-color: #f48f00;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  border: none;
  box-shadow: 0 9px #999;
}

i {
  cursor: pointer;
  font-size: 1.5em;
}

i.fa-edit {
  color: #3498db;
  margin-right: 15px;
}

i.fa-trash {
  color: #e74c3c;
}

/* Media queries para pantallas pequeñas */
@media (max-width: 768px) {
  .dashboardTitle {
    flex-direction: column;
    align-items: center;
  }

  .dashboardTitle button {
    margin-left: 0;
    margin-top: 20px; /* Ajustar el espacio entre el título y el botón */
  }

  .dashboardTitle h1 {
    font-size: 1.2em;
  }

  .create-button {
    padding: 8px 16px;
  }

  table {
    font-size: 0.8em; /* Reducir el tamaño de fuente en pantallas pequeñas */
  }
}
</style>
