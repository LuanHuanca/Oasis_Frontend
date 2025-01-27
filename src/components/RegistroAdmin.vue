<template>
  <div class="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="background-container">
      <!-- Imagen de fondo -->
      <img class="background-image" src="../assets/imageRegister.jpeg" alt="Background Image">
      <!-- Contenedor del formulario -->
      <div class="form-container">
        <!-- Título del formulario -->
        <h2 class="form-title">Registro Administrador</h2>
        <!-- Formulario -->
        <form @submit.prevent="createPersona" class="form">
          <!-- Datos Personales -->
          <div class="form-group">
            <input type="text" v-model="nombre" class="form-control" placeholder="Nombre" required>
          </div>
          <div class="form-group">
            <input type="text" v-model="apellidoP" class="form-control" placeholder="Apellido Paterno" required>
          </div>
          <div class="form-group">
            <input type="text" v-model="apellidoM" class="form-control" placeholder="Apellido Materno">
          </div>
          <div class="form-group">
            <input type="tel" v-model="telefono" class="form-control" placeholder="Teléfono">
          </div>
          <div class="form-group">
            <select v-model="rol" class="form-control" style="height: 40px">
              <option value="" disabled selected>Selecciona un Rol</option>
              <option value="Admin">Admin</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
          <!-- Botones -->
          <div class="button-group">
            <button type="button" @click="goBack" class="btn btn-secondary">Regresar</button>
            <input type="submit" value="Continuar" class="btn btn-primary">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';

export default {

  data() {
    return {
      personas:[],
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      telefono: '',
      correo: '',
      password: '',
      rol: ''
    };
  },
  methods: {
    async createPersona(){
      try {

        // Enviar solicitud para crear una persona
        const response = await axios.post('http://localhost:9999/api/v1/persona/create',{
          nombre: this.nombre,
          apellidoP: this.apellidoP,
          apellidoM: this.apellidoM,
          telefono: this.telefono,
          rol: this.rol
        });

        const nuevaPersona = response.data.data;
        console.log("Persona created");

        // Enviar solicitud para obtener el id de la última persona creada
        const response2 = await axios.get('http://localhost:9999/api/v1/persona/lastId');
        const lastPersona = response2.data.result;
        console.log("Last persona",lastPersona);

        // Enviar solicitud para crear un nuevo administrador
        const response3 = await axios.post('http://localhost:9999/api/v1/admin/create', {

          persona: {
            idPersona: lastPersona,
            nombre: this.nombre,
            apellidoP: this.apellidoP,
            apellidoM: this.apellidoM,
            telefono: this.telefono
          },
          rol: this.rol
        });

        console.log("Cuenta Admin created");

        // Limpiar campos
        this.nombre = '';
        this.apellidoP = '';
        this.apellidoM = '';
        this.telefono = '';
        this.correo = '';
        this.password = '';

        this.$router.push('/'); // Redirige a la ruta de Login

      } catch (error) {
        console.error("Error al crear la persona", error)
      }
    },
    goBack() {
      this.$router.push('/');
    },
  }
};
</script>


<style scoped>
/* Estilos generales */
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Contenedor de la imagen de fondo */
.background-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Imagen de fondo */
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Contenedor del formulario */
.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente */
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* Ancho del formulario */
  max-width: 400px; /* Ancho máximo del formulario */
}

/* Título del formulario */
.form-title {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  text-align: center;
}

/* Estilos para los campos de entrada */
.form-group {
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s ease; /* Transición suave para el borde */
}

/* Estilos para el borde al enfocar el campo de entrada */
.form-control:focus {
  border-bottom-color: #007bff;
  outline: none;
}

/* Botones */
.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.3s ease; /* Transición suave */
}

.btn-secondary {
  background-color: #999;
  color: #fff;
  border: 1px solid #999;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

/* Efecto de desplazamiento al pasar el cursor sobre los botones */
.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Mensaje para iniciar sesión */
.login-message {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

/* Estilos responsivos */
@media only screen and (max-width: 768px) {
  .form-container {
    padding: 20px;
  }
}

@media only screen and (max-width: 576px) {
  .form-container {
    padding: 15px;
    width: 90%;
  }
}
</style>
