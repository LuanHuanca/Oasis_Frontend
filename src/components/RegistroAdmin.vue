<template>
  <div class="app">
    <!-- Contenedor de la imagen de fondo -->
    <div class="background-container">
      <!-- Imagen de fondo -->
      <img
        class="background-image"
        src="../assets/imageRegister.jpeg"
        alt="Background Image"
      />
      <!-- Contenedor del formulario -->
      <div class="form-container">
        <!-- Título del formulario -->
        <h2 class="form-title">Registro Administrador</h2>
        <!-- Formulario -->
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
          <div class="form-group">
            <label for="correo"
              >Escriba un correo donde se enviará sus credenciales de
              acceso</label
            >
            <input
              type="email"
              v-model="correoenviar"
              class="form-control"
              placeholder="Correo"
              required
            />
          </div>
          
          <!-- Selector de rol -->
          <div class="form-group">
            <label for="role">Selecciona el rol</label>
            <select
              v-model="selectedRole"
              id="role"
              class="form-control"
              @change="updatePermissions"
              required
            >
              <option disabled value="">Seleccione un rol</option>
              <option v-for="role in roles" :key="role.name" :value="role.name">
                {{ role.name }}
              </option>
            </select>
          </div>

          <!-- Mostrar permisos según el rol -->
          <div class="form-group" v-if="permissions.length > 0">
            <label>Permisos del Rol:</label>
            <ul>
              <li v-for="(permission, index) in permissions" :key="index">
                {{ permission }}
              </li>
            </ul>
          </div>

          <!-- Botones -->
          <div class="button-group">
            <button type="button" @click="goBack" class="btn btn-secondary">
              Regresar
            </button>
            <input type="submit" value="Continuar" class="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      telefono: "",
      correoenviar: "",
      selectedRole: null,
      roles: [],  // Aquí guardaremos los roles disponibles
      permissions: [],  // Aquí guardamos los permisos según el rol seleccionado
    };
  },
  mounted() {
    // Cuando el componente se monte, obtendremos los roles disponibles desde el backend
    this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await axios.get("http://localhost:9999/api/v1/roles/list");
        this.roles = response.data; // Asigna los roles obtenidos
      } catch (error) {
        console.error("Error al obtener los roles", error);
      }
    },

    // Actualiza los permisos en función del rol seleccionado
    updatePermissions() {
      if (this.selectedRole) {
        // El backend debería retornar los permisos adecuados para cada rol
        const role = this.roles.find(role => role.name === this.selectedRole);
        this.permissions = role ? role.permissions : [];
      }
    },

    // Método para crear una persona
    async createPersona() {
      try {
        // 1. Crear la persona en la base de datos
        const response = await axios.post("http://localhost:9999/api/v1/persona/create", {
          nombre: this.nombre,
          apellidoP: this.apellidoP,
          apellidoM: this.apellidoM,
          telefono: this.telefono,
        });

        const nuevaPersona = response.data.data;
        console.log("Persona creada");

        // 2. Crear el administrador con los datos de la persona y el rol seleccionado
        await axios.post("http://localhost:9999/api/v1/admin/create", {
          persona: {
            idPersona: nuevaPersona.id,  // ID de la persona creada
            nombre: this.nombre,
            apellidoP: this.apellidoP,
            apellidoM: this.apellidoM,
            telefono: this.telefono,
          },
          rolId: this.selectedRole,  // ID del rol seleccionado
          permissions: this.permissions,  // Permisos asignados
        });

        console.log("Cuenta de administrador creada");
        await this.sendCredentialsMail();  // Enviar correo de credenciales
        this.clearForm();
        this.$router.push("/login");  // Redirige al login

      } catch (error) {
        console.error("Error al crear persona o admin", error);
      }
    },

    // Limpiar los campos del formulario
    clearForm() {
      this.nombre = "";
      this.apellidoP = "";
      this.apellidoM = "";
      this.telefono = "";
      this.correoenviar = "";
    },

    // Método para enviar el correo con las credenciales
    async sendCredentialsMail() {
      const correo = `${this.nombre}.${this.apellidoP}@tuguia.bo`.toLowerCase();
      const contrasena = `${this.nombre}${this.apellidoP.charAt(0)}${this.telefono}`;
      
      try {
        await axios.post("http://localhost:9999/mail/send", {
          to: this.correoenviar,
          subject: "Credenciales de Acceso a tu Cuenta",
          message: `Estimado/a usuario/a, tus credenciales son:\nCorreo: ${correo}\nContraseña: ${contrasena}`,
        });
        console.log("Correo enviado exitosamente");
      } catch (error) {
        console.error("Hubo un problema al enviar el correo:", error);
      }
    },

    // Método para volver atrás
    goBack() {
      this.$router.push("/");  // Redirige al inicio
    }
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
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
  transition: border-color 0.3s ease;
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
  transition: all 0.3s ease;
}

.btn-secondary {
  background-color: #999;
  color: #fff;
  border: 1px solid #999;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
}

.btn:hover {
  opacity: 0.9;
}
</style>
