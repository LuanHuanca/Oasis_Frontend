<template>
    <div class="TarjetaVerificacion">
      <img src="Oasis_Frontend\src\assets\\logoBack.png" alt="Logo" />
      <br />
      <h3>Verificacion de dos pasos</h3>
      <p>Se le envio un codigo de verificacion a su correo</p>
      <p>por favor ingrese ese codigo en el siguiente campo para la validacion</p>
      <form @submit.prevent="verificacionCodigo" class="form">
        <div class="CustomInput">
          <p>Codigo de verificacion:</p>
        <input
          placeholder="Ingrese su codigo de verificacion"
          type="text"
          v-model="verificacion"
          required
        />
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>
  </template>
<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importa ref para manejar la referencia al input
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'; // Importa SweetAlert2

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const codigo = store.state.randomCode;
    const verificacion = ref(""); // Crea una referencia reactiva para el valor del input

    const verificacionCodigo = () => {
      if (verificacion.value === codigo) { 
        toastTopEnd();
        router.push("/");
      } else {
        mostrarError("El código de verificación ingresado es incorrecto. Por favor, inténtelo de nuevo.");
      }
    };

    const mostrarError = (message:string) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        timer: 2000,
        text: message,
      });
    };

    const toastTopEnd = () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Felicidades',
        text: 'Su inicio de sesion se completo correctamente',
      });
    };

    return {
      verificacion,
      verificacionCodigo,
      mostrarError,
      toastTopEnd,
    };
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
  
  .TarjetaVerificacion {
    background: #f0d33f;
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
  .TarjetaVerificacion p{
    width: 80%;
  }
  
  .TarjetaVerificacion img {
    width: 35%;
  }
  
  .enlace {
    margin: 10px 0px;
  }
  
  .TarjetaVerificacion button {
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
    .TarjetaVerificacion {
      width: 70%;
      padding: 10px 2px;
    }
  }
  </style>