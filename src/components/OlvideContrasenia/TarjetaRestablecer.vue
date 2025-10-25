<template>
  <div class="TarjetaRestablecerContra">
    <img src="src/assets/logo_black.png" alt="Logo Tu Guia" />
    <br />
    <h3>Reestablecimiento de contraseña</h3>
    <p>En el siguiente apartado puede crear una nueva contraseña</p>
    <form @submit.prevent="verificarPassword" class="form">
      <div class="CustomInput">
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
            La contraseña debe ser de al menos 8 caracteres
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
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      correo: "",
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
  methods: {
    async verificarPassword() {
      

      console.log("Botón presionado — ejecutando verificarPassword()");
      try {
        const correo = this.$store.state.correo; // correo almacenado al solicitar el código

        // 1️⃣ Verificar que las contraseñas coincidan
        if (this.password !== this.passwordConf) {
          this.mostrarError("Las contraseñas no coinciden", "error");
          return;
        }

        // 2️⃣ Buscar al cliente por su correo
        const clienteResp = await axios.get(`http://localhost:9999/api/v1/cliente/correo/${correo}`);
        console.log("Respuesta del cliente:", clienteResp.data);
        const cliente = clienteResp.data.result;
        if (!cliente || !cliente.idCliente) {
          console.error("El backend no devolvió un cliente válido:", clienteResp.data);
          alert("No se encontró el cliente. Verifica el correo ingresado.");
          return;
        }
        console.log("Cliente encontrado:", cliente);

        // 3️⃣ Enviar la nueva contraseña al endpoint dedicado
        const body = { password: this.password };

        await axios.put(`http://localhost:9999/api/v1/cliente/${cliente.idCliente}/password`, body);

        // 4️⃣ Confirmar éxito
        this.$swal({
          icon: "success",
          title: "Contraseña actualizada correctamente",
          timer: 2000,
        });

        // 5️⃣ Redirigir al login
        this.$router.push("/");
      } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        this.mostrarError("No se pudo actualizar la contraseña", "error");
      }
    },




    // Función para validar la complejidad de la contraseña
    validatePassword(password) {
      // Al menos 8 caracteres
      if (password.length < 8) return false;
      // Al menos un número
      if (!/\d/.test(password)) return false;
      // Al menos una letra minúscula
      if (!/[a-z]/.test(password)) return false;
      // Al menos una letra mayúscula
      if (!/[A-Z]/.test(password)) return false;
      // Al menos un carácter especial
      if (!/[^a-zA-Z0-9]/.test(password)) return false;
      return true;
    },
    validaciones(password, passwordConf) {
      // Restablecer estados de validación
      this.icon_validacion0 = "fluent:error-circle-20-regular";
      this.estilo_validacion0 = "red";
      this.confirmacion0 = "validation_error";
      this.icon_validacion1 = "fluent:error-circle-20-regular";
      this.estilo_validacion1 = "red";
      this.confirmacion1 = "validation_error";
      this.icon_validacion2 = "fluent:error-circle-20-regular";
      this.estilo_validacion2 = "red";
      this.confirmacion2 = "validation_error";
      this.icon_validacion3 = "fluent:error-circle-20-regular";
      this.estilo_validacion3 = "red";
      this.confirmacion3 = "validation_error";
      this.icon_validacion4 = "fluent:error-circle-20-regular";
      this.estilo_validacion4 = "red";
      this.confirmacion4 = "validation_error";
      this.icon_validacion5 = "fluent:error-circle-20-regular";
      this.estilo_validacion5 = "red";
      this.confirmacion5 = "validation_error";

      if (password.length > 0 || passwordConf.length > 0) {
        if (password === passwordConf) {
          this.icon_validacion0 = "lets-icons:check-fill";
          this.estilo_validacion0 = "green";
          this.confirmacion0 = "validation_check";

          if (password.length >= 8) {
            this.icon_validacion1 = "lets-icons:check-fill";
            this.estilo_validacion1 = "green";
            this.confirmacion1 = "validation_check";
          }

          if (/[a-z]/.test(password)) {
            this.icon_validacion2 = "lets-icons:check-fill";
            this.estilo_validacion2 = "green";
            this.confirmacion2 = "validation_check";
          }

          if (/[A-Z]/.test(password)) {
            this.icon_validacion3 = "lets-icons:check-fill";
            this.estilo_validacion3 = "green";
            this.confirmacion3 = "validation_check";
          }

          if (/[^a-zA-Z0-9]/.test(password)) {
            this.icon_validacion4 = "lets-icons:check-fill";
            this.estilo_validacion4 = "green";
            this.confirmacion4 = "validation_check";
          }

          if (/\d/.test(password)) {
            this.icon_validacion5 = "lets-icons:check-fill";
            this.estilo_validacion5 = "green";
            this.confirmacion5 = "validation_check";
          }
        }
      }
    },
    mostrarError(message, icon) {
      this.$swal({
        icon: icon,
        timer: 3000,
        title: "Oops...",
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
