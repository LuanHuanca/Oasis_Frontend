<template>
  <div class="TarjetaRestablecerContra">
    <img src="@/assets/Home/carusel/Logo.png" alt="Logo Tu Guia" />
    <br />
    <h3>Cambio de contraseña</h3>
    <p>Para cambiar su contraseña, primero debe verificar su contraseña actual</p>
    <form @submit.prevent="verificarPassword" class="form">
      <div class="CustomInput">
        <!-- Campo para contraseña actual (para ambos tipos de usuario) -->
        <p>Contraseña actual:</p>
        <input
          placeholder="Ingrese su contraseña actual"
          type="password"
          v-model="currentPassword"
          required
        />
        
        <p>Nueva contraseña:</p>
        <input
          placeholder="Ingrese una nueva contraseña"
          type="password"
          v-model="password"
          required
        />
        <p>Confirmar contraseña:</p>
        <input
          placeholder="Repita la contraseña"
          type="password"
          v-model="passwordConf"
          required
        />
      </div>
      <div class="validation">
        <div>
          <Icon
            :icon="icon_validacion0"
            width="16"
            height="16"
            :color="estilo_validacion0"
          />
          <p :class="confirmacion0">Las contraseñas deben ser iguales</p>
        </div>
        <div>
          <Icon
            :icon="icon_validacion1"
            width="16"
            height="16"
            :color="estilo_validacion1"
          />
          <p :class="confirmacion1">
            La contraseña debe ser de al menos 12 caracteres
          </p>
        </div>
        <div>
          <Icon
            :icon="icon_validacion2"
            width="16"
            height="16"
            :color="estilo_validacion2"
          />
          <p :class="confirmacion2">
            La contraseña debe contener al menos una minuscula
          </p>
        </div>
        <div>
          <Icon
            :icon="icon_validacion3"
            width="16"
            height="16"
            :color="estilo_validacion3"
          />
          <p :class="confirmacion3">
            La contraseña debe contener al menos una mayuscula
          </p>
        </div>
        <div>
          <Icon
            :icon="icon_validacion4"
            width="16"
            height="16"
            :color="estilo_validacion4"
          />
          <p :class="confirmacion4">
            La contraseña debe contener al menos un caracter especial
          </p>
        </div>
        <div>
          <Icon
            :icon="icon_validacion5"
            width="16"
            height="16"
            :color="estilo_validacion5"
          />
          <p :class="confirmacion5">
            La contraseña debe contener al menos un numero
          </p>
        </div>
      </div>
      <button type="button" @click="verificarPassword" class="btn-continuar">Continuar</button>
   </form>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from '@/config/api';
import { Icon } from "@iconify/vue";
import auditService from "@/functions/auditService";

export default {
  data() {
    return {
      correo: "",
      currentPassword: "", // Para administradores
      password: "",
      passwordConf: "",
      // para la validacion de la contraseña
      // validacion de igualdad
      icon_validacion0: "fluent:error-circle-20-regular",
      estilo_validacion0: "red",
      confirmacion0: "validation_error",
      // validacion de longitud
      icon_validacion1: "fluent:error-circle-20-regular",
      estilo_validacion1: "red",
      confirmacion1: "validation_error",
      // validacion de minuscula
      icon_validacion2: "fluent:error-circle-20-regular",
      estilo_validacion2: "red",
      confirmacion2: "validation_error",
      // validacion de mayuscula
      icon_validacion3: "fluent:error-circle-20-regular",
      estilo_validacion3: "red",
      confirmacion3: "validation_error",
      // validacion de caracter especial
      icon_validacion4: "fluent:error-circle-20-regular",
      estilo_validacion4: "red",
      confirmacion4: "validation_error",
      // validacion de numero
      icon_validacion5: "fluent:error-circle-20-regular",
      estilo_validacion5: "red",
      confirmacion5: "validation_error",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.admin === true;
    },
    userId() {
      return this.$store.state.id;
    }
  },
  methods: {
    async verificarPassword() {
      try {
        // Validaciones básicas
        if (!this.validatePassword(this.password)) {
          console.error("La contraseña no cumple con los requisitos mínimos");
          this.mostrarError(
            "La contraseña debe contener mínimo 12 caracteres que incluya caracteres especiales, numéricos, mayúsculas y minúsculas",
            "error"
          );
          return;
        }
        
        if (this.password !== this.passwordConf) {
          this.mostrarError("Las contraseñas no coinciden", "error");
          return;
        }

        // Validar que se ingrese la contraseña actual
        if (!this.currentPassword) {
          this.mostrarError("Debe ingresar su contraseña actual", "error");
          return;
        }

        console.log("idAdmin: ", this.$store.state.id); // objeto con la informacion del usuario
        console.log("admin: ", this.$store.state.admin); // true o false

        const userId = this.userId;
        if (!userId) {
          this.mostrarError("No se pudo obtener el ID del usuario", "error");
          return;
        }

        // FLUJO UNIFICADO: Validar contraseña actual + Cambiar contraseña
        const userType = this.isAdmin ? 'admin' : 'cliente';
        const userEmail = this.$store.state.user?.result?.correo || this.$store.state.correo || 'DESCONOCIDO';
        
        try {
          // Paso 1: Validar contraseña actual
          const validateResponse = await axios.post(
            `${API_URL}/${userType}/${userId}/validate-password`,
            { password: this.currentPassword }
          );

          console.log("Respuesta de validación:", validateResponse.data);

          // Verificar que el resultado de la validación sea true
          if (!validateResponse.data.result) {
            // ❌ Auditoría: Validación de contraseña fallida
            await auditService.auditValidacionContrasena(userEmail, false);
            
            this.mostrarError("La contraseña actual es incorrecta", "error");
            return;
          }

          // ✅ Auditoría: Validación de contraseña exitosa
          await auditService.auditValidacionContrasena(userEmail, true);

          // Paso 2: Si la validación es exitosa (result: true), cambiar la contraseña
          const changeResponse = await axios.put(
            `${API_URL}/${userType}/${userId}/password`,
            { password: this.password }
          );

          console.log("Respuesta del backend:", changeResponse.data);
          
          // ✅ Auditoría: Cambio de contraseña exitoso
          await auditService.auditCambioContrasena(userEmail, true);
          
          this.handleSuccessResponse(changeResponse.data);

        } catch (error) {
          console.error(`Error en flujo de ${userType}:`, error);
          
          // ❌ Auditoría: Cambio de contraseña fallido
          await auditService.auditCambioContrasena(userEmail, false);
          
          this.handleErrorResponse(error);
        }

      } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        this.handleErrorResponse(error);
      }
    },

    handleSuccessResponse(data) {
      if (data && data.code === '200-OK') {
        // Usar el mensaje del backend si está disponible, sino usar uno por defecto
        const message = data.message || 'Contraseña actualizada correctamente';
        this.$swal({ 
          icon: 'success', 
          title: message, 
          timer: 1800 
        });
        setTimeout(() => this.$router.push('/'), 600);
      } else {
        // Usar el mensaje del backend si está disponible
        const message = data?.message || "No se pudo actualizar la contraseña";
        this.$swal({ icon: 'error', title: 'Error', text: message });
      }
    },

    handleErrorResponse(error) {
      // Priorizar el mensaje del backend
      const msg = error?.response?.data?.message || error.message || 'No se pudo actualizar la contraseña';
      this.$swal({ icon: 'error', title: 'Error', text: msg });
    },




// Función para validar la complejidad de la contraseña
    validatePassword(password) {
      console.log(password);
      // Al menos 8 caracteres
      if (password.length < 13) {
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
        if (password.length >= 12) {
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
        if (password === passwordConf ) {
          this.icon_validacion0 = 'lets-icons:check-fill';
          this.estilo_validacion0 = 'green';
          this.confirmacion0 = 'validation_check';
        }
        
      }
    },
    mostrarError(message, icon) {
      this.$swal({
        icon: icon,
        timer: 3000,
        title: "Error",
        text: message,
      });
    },
  },
  watch: {
    password(newPassword) {
      this.validaciones(newPassword, this.passwordConf);
    },
    passwordConf(newPasswordConf) {
      this.validaciones(this.password, newPasswordConf);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style>
/* Estilos de la validacion */
.validation {
  width: 85%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 15px;
  margin: 10px 0px;
}
.validation div {
  display: flex;
  width: 100%;
  align-items: center;
}
.validation_error {
  font-size: 12px;
  padding: 0;
  width: 100%;
  margin: 0;
  color: red;
}
.validation_check {
  font-size: 12px;
  padding: 0;
  width: 100%;
  margin: 0;
  color: green;
}

.CustomInput {
  width: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0px;
}
.CustomInput p {
  padding: 0;
  margin: 0;
}
.CustomInput input {
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px 20px;
}
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.TarjetaRestablecerContra {
  background: #d5f3fb;
  border: 3px solid black;
  width: 30%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 8px;
  border-radius: 30px;
}

.TarjetaRestablecerContra img {
  width: 35%;
}

.TarjetaRestablecerContra h3 {
  width: 80%;
}

.enlace {
  margin: 10px 0px;
}

.TarjetaRestablecerContra button {
  width: 85%;
  border-radius: 25px;
  padding: 10px;
  background-color: blue;
  border: 2px solid black;
  color: #fff;
}


.registro-enlace-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
@media (max-width: 860px) {
  .TarjetaRestablecerContra {
    width: 70%;
    padding: 10px 2px;
  }
}
</style>
