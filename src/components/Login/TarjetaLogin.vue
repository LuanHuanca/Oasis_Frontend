<template>
  <div class="TarjetaLogin">
    <img src="src/assets/logo_black.png" alt="Logo Oasis" />
    <br />
    <h3>Bienvenido</h3>
    <p>Inicie su sesión para continuar en Oasis</p>
    <form @submit.prevent="continuar" class="form">
      <div class="CustomInput">
        <p>Correo electronico:</p>
        <input
          placeholder="Ingrese su correo electronico"
          type="text"
          v-model="correo"
        />
      </div>
      <div class="CustomInput">
        <p>Contraseña:</p>
        <input
          placeholder="Ingrese su contraseña"
          type="password"
          v-model="password"
        />
      </div>
      <router-link to="" @click="olvideContrasena" class="enlace"
        >¿Olvidaste tu contraseña?</router-link
      >
      <button type="submit">Continuar</button>
    </form>
    <div class="registro-enlace-container">
      <span>¿No tienes una cuenta?</span>
      <router-link to="/RegistroPersona" class="enlace">Regístrate</router-link>
    </div>
    <GoogleLogin :callback="callback" prompt auto-login />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { decodeCredential } from "vue3-google-login";
import CustomInput from "./CustomInput.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { User } from "@auth0/auth0-vue";

export default defineComponent({
  name: "TarjetaLogin",
  data() {
    return {
      correo: "",
      password: "",
      idAdmin: 0,
      idCliente: 0,
      randomCode: "",
      actividad: "",
      fecha: "",
      hora: "",
      fechaInicio: "",
      fechaFin: "",
      ipAddress: "",
    };
  },
  components: {
    CustomInput,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const idAdmin = ref("");
    const idCliente = ref("");

    const callback = async (response) => {
      console.log("Inicio de sesión con éxito");
      const user = decodeCredential(response.credential);
      store.commit("setLoggedIn", true);
      store.commit("setUser", user);
      console.info("SUB: ", user.sub);
      store.commit("setId", user.sub);

      console.info("ID SUB: ", store.state.id);

      idAdmin.value = null;
      idCliente.value = parseInt(store.state.id, 16);
      router.push("/");
    };
    return {
      callback,
      user: store.state.user,
    };
  },

  methods: {
    olvideContrasena() {
      const router = useRouter();
      if (this.correo) {
        this.randomCode = this.generateCode();
        this.$store.commit("setRandomCode", this.randomCode);
        this.tokenDeOlvido();
        this.$router.push("/TokenOlvido");
      } else {
        console.error("Por favor, Llena por lo menos el email");
        this.mostrarError(
          "Por favor, debe ingresar al menos el email ",
          "error"
        );
      }
    },

    async loginPersona() {
      const store = useStore();
      const router = useRouter();
      try {
        // Realiza una solicitud POST al endpoint de inicio de sesión
        const response = await axios.post(
          "http://localhost:9999/api/v1/cliente/login",
          {
            correo: this.correo, // Usa el valor del nombre de usuario del input
            password: this.password, // Usa el valor de la contraseña del input
          }
        );

        const user = response.data;

        if (user.code === "200-OK") {
          // Si el inicio de sesión es exitoso, guarda el usuario en el store y redirige a la página principal
          this.$store.commit("setLoggedIn", true);
          this.$store.commit("setUser", user);
          console.log(user);
          console.info("ID: ", response.data.result["idCliente"]);
          this.$store.commit("setId", response.data.result["idCliente"]);
          this.$store.commit("setRol", "Cliente");
          console.info("ROL: ", this.$store.state.rol);

          this.randomCode = this.generateCode(); // Llama a la función dentro del componente
          this.$store.commit("setRandomCode", this.randomCode);
          this.sendMail(); // Llama a la función sendMail() para enviar el correo de verificación
          console.log("Se envio la solicitud al correo" + this.correo);
          this.toastTopEnd();

          console.info("ID: ", this.$store.state.id);
          //this.idAdmin.value = this.$store.state.id;
          this.idAdmin = null;
          this.idCliente = this.$store.state.id;

          //router.push("/");
          this.$router.push("/Verificacion");
          // Crear auditoría para inicio de sesión exitoso
          this.actividad = "Inicio de sesión exitoso Cliente";
          await this.crearAuditoria();
          console.log("CLIENTE:", user);
        } else {
          // Si el inicio de sesión no es exitoso, muestra un mensaje de error
          console.error("Error al iniciar sesión:", response.data.message);
          // alert("Error al iniciar sesión: Correo o contraseña incorrectos");
          this.mostrarError(
            "Error al iniciar sesión: Correo o contraseña incorrectos",
            "error"
          );
          // Crear auditoría para contraseña erronea
          this.actividad = "Se introdujo contraseña incorrecta";
          await this.crearAuditoria();
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // alert("Error al iniciar sesión");
        this.mostrarError("Error al iniciar sesion", "error");
      }
    },

    async loginAdmin() {
      const store = useStore();
      const router = useRouter();
      try {
        // Realiza una solicitud POST al endpoint de inicio de sesión
        const response = await axios.post(
          "http://localhost:9999/api/v1/admin/login",
          {
            correo: this.correo, // Usa el valor del nombre de usuario del input
            password: this.password, // Usa el valor de la contraseña del input
          }
        );

        const user = response.data;
        if (user.code === "200-OK") {
          // Si el inicio de sesión es exitoso, guarda el usuario en el store y redirige a la página principal
          this.$store.commit("setLoggedIn", true);
          this.$store.commit("setAdmin", true);
          this.$store.commit("setUser", user);
          console.info("ID: ", response.data.result["idAdmin"]);
          this.$store.commit("setId", response.data.result["idAdmin"]);
          this.$store.commit("setRol", "Admin");
          console.info("ROL: ", this.$store.state.rol);

          console.info("ID: ", this.$store.state.id);
          //this.idAdmin.value = this.$store.state.id;
          this.idAdmin = this.$store.state.id;
          this.idCliente = null;
          // Crear auditoría para inicio de sesión exitoso
          this.actividad = "Inicio de sesión exitoso Administrador";
          await this.crearAuditoria();

          //router.push("/");
          this.$router.push("/Dashboard");
          this.mostrarError(
            "Felicidades acceso aceptado Administrador",
            "success"
          );
          console.log("ADMINISTRADOR:", user);
        } else {
          // Si el inicio de sesión no es exitoso, muestra un mensaje de error
          console.error("Error al iniciar sesión:", response.data.message);
          // alert("Error al iniciar sesión: Correo o contraseña incorrectos");
          this.mostrarError(
            "Error al iniciar sesión: Correo o contraseña incorrectos",
            "error"
          );
          // Crear auditoría para contraseña erronea
          this.actividad = "Se introdujo contraseña incorrecta";
          await this.crearAuditoria();
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // alert("Error al iniciar sesión");
        this.mostrarError("Error al iniciar sesion", "error");
      }
    },

    async verificarCorreoAdmin(correo) {
      if (correo.includes("@oasis")) {
        // El correo contiene el dominio "@oasis", realiza la acción deseada
        console.log("El correo ingresado pertenece a la empresa");
        await this.loginAdmin();
      } else {
        // El correo no contiene el dominio "@oasis"
        console.log("El correo ingresado no pertenece a la empresa");
        await this.loginPersona();
      }
    },

    async continuar() {
      console.log("Usuario:", this.correo);
      console.log("ENTRA", this.correo, this.password);
      // Validar los campos, por ejemplo, si están llenos
      if (this.correo && this.password) {
        // Si los campos son válidos, llamar a loginPersona para iniciar sesión
        // Llamar al método para verificar el correo
        this.verificarCorreoAdmin(this.correo);
      } else {
        // Si los campos no son válidos, puedes mostrar un mensaje de error o realizar otra acción
        console.error("Por favor, llena todos los campos");
        window.alert("Por favor, llena todos los campos");
      }
    },
    mostrarError(message, icon) {
      this.$swal({
        icon: icon,
        timer: 2000,
        title: "Vaya...",
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
        title: "Acceso casi completo",
        text: "Seguimos con la autenticacion de dos pasos",
      });
    },

    async sendMail() {
      const url = "http://localhost:9999/mail/send/" + this.correo;
      const data = {
        subject: "Código de Verificación en Dos Pasos para Acceder a tu Cuenta",
        message: `Estimado/a Usuario/a,

Para completar el proceso de verificación en dos pasos y acceder a tu cuenta de manera segura, por favor utiliza el siguiente código de verificación:

Código de Verificación: ${this.randomCode}

Por favor, asegúrate de introducir este código en el campo correspondiente en la pantalla de inicio de sesión para finalizar el proceso de verificación en dos pasos.

Si no has intentado iniciar sesión o no reconoces esta actividad, por favor contacta con nuestro equipo de soporte de inmediato para tomar las medidas necesarias.

Gracias por tu cooperación en garantizar la seguridad de tu cuenta.

Atentamente,

Agencia de Viajes Oasis
Max Pasten, Gerente de la agencia de viajes`,
      };
      const response2 = await axios.post(url, data).catch((error) => {
        console.error("Hubo un problema al enviar el correo:", error);
      });
    },
    async tokenDeOlvido() {
      const url = "http://localhost:9999/mail/send/" + this.correo;
      const data = {
        subject: "Solicitud de restablecimiento de contraseña",
        message: `Estimado/a Usuario/a,

Hemos recibido una solicitud para restablecer tu contraseña. Si no has solicitado este cambio, por favor ignora este mensaje.

Para restablecer tu contraseña, utiliza el siguiente código de verificación:

Código de Verificación: ${this.randomCode}

Por favor, asegúrate de introducir este código en el campo correspondiente en la pantalla de restablecimiento de contraseña para completar el proceso.

Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.

Gracias,
Agencia de Viajes Oasis`,
      };

      await axios
        .post(url, data)
        .then((response) => {
          console.log("El correo fue enviado exitosamente:", response.data);
        })
        .catch((error) => {
          console.error("Hubo un problema al enviar el correo:", error);
        });
    },
    // Método para generar un código aleatorio de 6 dígitos
    generateCode() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return code;
    },
    async crearAuditoria() {
      try {
        // Calcular fecha
        const ahora = new Date();
        const dia = String(ahora.getDate()).padStart(2, "0");
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const anio = ahora.getFullYear();
        const horas = String(ahora.getHours()).padStart(2, "0");
        const minutos = String(ahora.getMinutes()).padStart(2, "0");
        const segundos = String(ahora.getSeconds()).padStart(2, "0");

        this.fecha = `${anio}-${mes}-${dia}`;
        this.hora = `${horas}:${minutos}:${segundos}`;
        this.fechaInicio = `${this.fecha}T${this.hora}`;
        this.fechaFin = `${this.fecha}T${this.hora}`;

        // Obtener dirección IP
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log("IP: ", data.ip);
        this.ipAddress = data.ip;

        await axios.post("http://localhost:9999/api/v1/auditoria/create", {
          correo: this.correo,
          actividad: this.actividad,
          fecha: this.fecha,
          hora: this.hora,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          ip: this.ipAddress,
        });

        console.log("Auditoría creada");
      } catch (error) {
        console.error("Error al crear la auditoría:", error);
      }
    },
  },
});
</script>

<style>
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

.TarjetaLogin {
  background: #d5f3fb;
  border: 3px solid black;
  width: 25%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 8px;
  border-radius: 30px;
}

.TarjetaLogin img {
  width: 35%;
}

.enlace {
  margin: 10px 0px;
}

.TarjetaLogin button {
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
@media (max-width: 860px) {
  .TarjetaLogin {
    width: 70%;
    padding: 10px 2px;
  }
}
</style>
