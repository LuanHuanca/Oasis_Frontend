<template>
  <div class="app">
    <div class="background-container">
      <img
        class="background-image"
        src="../assets/imageRegister.jpeg"
        alt="Background Image"
      />
      <!-- Contenedor del formulario -->
      <div class="form-container">
        <!-- Título del formulario -->
        <h2 class="form-title">Registro</h2>
        <form @submit.prevent="createPersona" class="form">
          <!-- Datos Personales -->
          <div class="form-group">
            <input
              type="text"
              v-model="nombre"
              class="form-control"
              placeholder="Nombre"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="apellidoP"
              class="form-control"
              placeholder="Apellido Paterno"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="apellidoM"
              class="form-control"
              placeholder="Apellido Materno"
            />
          </div>
          <div class="form-group">
            <input
              type="tel"
              v-model="telefono"
              class="form-control"
              placeholder="Teléfono"
            />
          </div>
          <!-- Datos de Cuenta -->
          <div class="form-group">
            <input
              type="email"
              v-model="correo"
              class="form-control"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Contraseña"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="passwordConf"
              class="form-control"
              placeholder="Confirmar contraseña"
              required
            />
          </div>
          <div class="validation">
            <div>
              <Icon :icon="icon_validacion0" width="16" height="16" :color='estilo_validacion0'/>
              <p :class='confirmacion0'>Las contraseñas deben ser iguales</p>
            </div>            
            <div>
              <Icon :icon="icon_validacion1" width="16" height="16" :color='estilo_validacion1'/>
              <p :class='confirmacion1'>La contraseña debe ser de al menos 8 caracteres</p>
            </div>
            <div>
              <Icon :icon="icon_validacion2" width="16" height="16" :color='estilo_validacion2'/>
              <p :class='confirmacion2'>La contraseña debe contener al menos una minuscula</p>
            </div>
            <div>
              <Icon :icon="icon_validacion3" width="16" height="16" :color='estilo_validacion3'/>
              <p :class='confirmacion3'>La contraseña debe contener al menos una mayuscula</p>
            </div>
            <div>
              <Icon :icon="icon_validacion4" width="16" height="16" :color='estilo_validacion4'/>
              <p :class='confirmacion4'>La contraseña debe contener al menos un caracter especial</p>
            </div>
            <div>
              <Icon :icon="icon_validacion5" width="16" height="16" :color='estilo_validacion5'/>
              <p :class='confirmacion5'>La contraseña debe contener al menos un numero</p>
            </div>           
          </div>
          <div class="button-group">
            <button type="button" @click="goBack" class="btn btn-secondary">
              Regresar
            </button>
            <input type="submit" value="Continuar" class="btn btn-primary" />
          </div>
        </form>
        <!-- Mensaje para iniciar sesión -->
        <p class="login-message">
          ¿Ya tienes una cuenta?
          <router-link to="/login" 
            >Inicia sesión aquí</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      personas: [],
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      telefono: "",
      correo: "",
      password: "",
      passwordConf: "",
      // para la validacion de la contraseña
      // validacion de igualdad
      icon_validacion0:"fluent:error-circle-20-regular",
      estilo_validacion0:'red',
      confirmacion0:'validation_error',
      // validacion de longitud
      icon_validacion1:"fluent:error-circle-20-regular",
      estilo_validacion1:'red',
      confirmacion1:'validation_error',
      // validacion de minuscula
      icon_validacion2:"fluent:error-circle-20-regular",
      estilo_validacion2:'red',
      confirmacion2:'validation_error',
      // validacion de mayuscula
      icon_validacion3:"fluent:error-circle-20-regular",
      estilo_validacion3:'red',
      confirmacion3:'validation_error',
      // validacion de caracter especial
      icon_validacion4:"fluent:error-circle-20-regular",
      estilo_validacion4:'red',
      confirmacion4:'validation_error',
      // validacion de numero
      icon_validacion5:"fluent:error-circle-20-regular",
      estilo_validacion5:'red',
      confirmacion5:'validation_error',

      actividad: 'Creacion de cuenta Cliente',
      fecha: '',
      hora: '',
      fechaInicio: '',
      fechaFin: '',
      ipAddress: '',
    };
  },
  methods: {
    async createPersona() {
      try {
        
        // Validar complejidad de la contraseña
        if (!this.validatePassword(this.password)) {
          console.error("La contraseña no cumple con los requisitos mínimos");
          // window.alert("La contraseña no debe conterner minimo 8 caracteres que incluya caracteres especiales, numericos," +
          //     "mayusculas y minusculas");
          this.mostrarError(
            "La contraseña no debe conterner minimo 8 caracteres que incluya caracteres especiales, numericos, mayusculas y minusculas",
            "error"
          );
          return;
        }
        // Validar contraseña
        if (this.password !== this.passwordConf) {
          console.error("Las contraseñas no coinciden");
          // window.alert("Las contraseñas no coinciden");
          this.mostrarError("Las contraseñas no coinciden", "error");
          return;
        }

        // Enviar solicitud para crear una persona
        const response = await axios.post(
          "http://localhost:9999/api/v1/persona/create",
          {
            nombre: this.nombre,
            apellidoP: this.apellidoP,
            apellidoM: this.apellidoM,
            telefono: this.telefono,
          }
        );

        const nuevaPersona = response.data.data;
        console.log("Persona created");

        // Enviar solicitud para obtener el id de la última persona creada
        const response2 = await axios.get(
          "http://localhost:9999/api/v1/persona/lastId"
        );
        const lastPersona = response2.data.result;
        console.log("Last persona", lastPersona);
        
        // Enviar solicitud para crear una cuenta
        const response3 = await axios.post(
          "http://localhost:9999/api/v1/cliente/create",
          {
            correo: this.correo,
            password: this.password,
            estadoCuenta: "Activa",
            idPersona: lastPersona,
          }
        );
        
        await this.auditoriaUser();
        const nuevaCuenta = response3.data.data;
        console.log("Cuenta created");
        this.toastTopEnd();

        this.nombre = '';
        this.apellidoP = '';
        this.apellidoM = '';
        this.telefono = '';
        this.correo = '';
        this.password = '';
        this.passwordConf = '';

        this.$router.push('/'); // Redirige a la ruta de Login

      } catch (error){
        console.error("Error al crear la persona",error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Error al crear la persona",
          showClass: {
            popup: 'animate_animated animate_bounceIn'
          },
          hideClass: {
            popup: 'animate_animated animate_fadeOut'
          }
        });
      }
    },
    goBack() {
      this.$router.push("/");
    },
    // Función para validar la complejidad de la contraseña
    validatePassword(password) {
      console.log(password);
      // Al menos 8 caracteres
      if (password.length < 8) {
        console.log("Tamanio");
        return false;
      }
      // Al menos un número
      if (!/\d/.test(password)) {
        console.log("un numero");
        return false;
      }
      // Al menos una letra minúscula
      if (!/[a-z]/.test(password)) {
        console.log("minu");
        return false;
      }
      // Al menos una letra mayúscula
      if (!/[A-Z]/.test(password)) {
        console.log("mayu");
        return false;
      }
      // Al menos un carácter especial
      if (!/[^a-zA-Z0-9]/.test(password)) {
        console.log("espec");
        return false;
      }
      return true;
    },

    validaciones(password, passwordConf) {
      // Restablecer estados de validación
      this.icon_validacion0 = 'fluent:error-circle-20-regular';
      this.estilo_validacion0 = 'red';
      this.confirmacion0 = 'validation_error';
      this.icon_validacion1 = 'fluent:error-circle-20-regular';
      this.estilo_validacion1 = 'red';
      this.confirmacion1 = 'validation_error';
      this.icon_validacion2 = 'fluent:error-circle-20-regular';
      this.estilo_validacion2 = 'red';
      this.confirmacion2 = 'validation_error';
      this.icon_validacion3 = 'fluent:error-circle-20-regular';
      this.estilo_validacion3 = 'red';
      this.confirmacion3 = 'validation_error';
      this.icon_validacion4 = 'fluent:error-circle-20-regular';
      this.estilo_validacion4 = 'red';
      this.confirmacion4 = 'validation_error';
      this.icon_validacion5 = 'fluent:error-circle-20-regular';
      this.estilo_validacion5 = 'red';
      this.confirmacion5 = 'validation_error';

      if (password.length > 0 || passwordConf.length > 0) {
        if (password === passwordConf) {
          this.icon_validacion0 = 'lets-icons:check-fill';
          this.estilo_validacion0 = 'green';
          this.confirmacion0 = 'validation_check';
          
          if (password.length >= 8) {
            this.icon_validacion1 = 'lets-icons:check-fill';
            this.estilo_validacion1 = 'green';
            this.confirmacion1 = 'validation_check';
          }
          
          if (/[a-z]/.test(password)) {
            this.icon_validacion2 = 'lets-icons:check-fill';
            this.estilo_validacion2 = 'green';
            this.confirmacion2 = 'validation_check';
          }
          
          if (/[A-Z]/.test(password)) {
            this.icon_validacion3 = 'lets-icons:check-fill';
            this.estilo_validacion3 = 'green';
            this.confirmacion3 = 'validation_check';
          }
          
          if (/[^a-zA-Z0-9]/.test(password)) {
            this.icon_validacion4 = 'lets-icons:check-fill';
            this.estilo_validacion4 = 'green';
            this.confirmacion4 = 'validation_check';
          }
          
          if (/\d/.test(password)) {
            this.icon_validacion5 = 'lets-icons:check-fill';
            this.estilo_validacion5 = 'green';
            this.confirmacion5 = 'validation_check';
          }
        }
      }
    },
    mostrarError(message) {
      this.$swal({
        icon: "error",
        title: "Oops...",
        timer: 2000,
        text: message,
      });
    },

    toastTopEnd() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        title: "Felicidades",
        text: "Su registro se realizo correctamente, ahora puede iniciar sesion en la pagina",
      });
    },
    calcularFecha() {
      const ahora = new Date();
      const dia = String(ahora.getDate()).padStart(2, '0');
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const anio = ahora.getFullYear();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');

      this.fecha = `${anio}-${mes}-${dia}`;
      this.hora = `${horas}:${minutos}:${segundos}`;
      this.fechaInicio = `${this.fecha}T${this.hora}`;
    },
    async getIPAddress() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log("IP: ", data.ip);
        this.ipAddress = data.ip;
      } catch (error) {
        console.error('Error al obtener la dirección IP:', error);
      }
    },
    async auditoriaUser() {
      // Calcular fecha y obtener IP
      this.calcularFecha();
      await this.getIPAddress();
      try {
        console.log("correo creado"+this.correo);
        console.log("actividad creado"+this.actividad);
        console.log("fecha creado"+this.fecha);
        console.log("hora creado"+this.hora);
        console.log("fecha inicio creado"+this.fechaInicio);
        console.log("fecha fin creado"+this.fechaFin);
        console.log("ip creado"+this.ipAddress);
        await axios.post('http://localhost:9999/api/v1/auditoria/create', {
          correo: this.correo,
          actividad: this.actividad,
          fecha: this.fecha,
          hora: this.hora,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          ip: this.ipAddress
        });

        console.log("Auditoría creada");
      } catch (error) {
        console.error('Error al crear la auditoría:', error);
      }
    },
  },
  watch:{
    password(newPassword) {
      this.validaciones(newPassword, this.passwordConf);
    },
    passwordConf(newPasswordConf) {
      this.validaciones(this.password, newPasswordConf);
    }
  },
  components: {
      Icon,
  },
};
</script>

<style scoped>
/* Estilos de la validacion */
.validation {
  padding: 8px;
  border: 1px solid black ;
  border-radius: 15px;
}
.validation div {
  display: flex;
  align-items: center;
}
.validation_error{
  margin-left: 8px;
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: red;
}
.validation_check{
  margin-left: 8px;
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: green;
}

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
  max-width: 550px; /* Ancho máximo del formulario */
}
/* Título del formulario */
.form-title {
  color: #333;
  font-size: 24px;
  text-align: center;
}

/* Estilos para los campos de entrada */
.form-group {
  width: 75%;
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
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 20px;
  margin: 0px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.3s ease; /* Transición suave */
  margin: 0 10px; /* Espacio entre los botones */
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
  margin-top: 5px;
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

/* Estilos para las alertas */
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.alert-success {
  background-color: #c6dbcb;
  border: 1px solid #c3e6cb;
  color: #155724;
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
