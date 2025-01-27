<template>
    <div class="TarjetaServicio">
      <Icon class="icono" :icon="icono" :color="colorIcono" />
      <div class="Servicio-informacion">
        <h3>{{ titulo }}</h3>
        <p>{{ descripcion }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue';
  
  export default {
    props: {
      icono: {
        type: String,
        required: true,
      },
      colorIcono: {
        type: String,
        default: 'green',
      },
      titulo: {
        type: String,
        default: 'Título del Servicio',
      },
      descripcion: {
        type: String,
        default: 'Descripción del Servicio',
      },
    },
    components: {
      Icon,
    },
  };
  </script>
  
  <style scoped>
  .TarjetaServicio {
    width: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #B5B5B5;
    border-radius: 20px;
    padding: 20px;
  }
  .icono{
    margin: 0px 20px ; 
    width: 300px; 
    height: fit-content;
  }
  .Servicio-informacion {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 760px) {
    .icono {
      width: 200px;
    }
    .TarjetaServicio {
      width: 300px;
    }
    .TarjetaServicio h3{
      font-size: 20px;
    }
    .TarjetaServicio p{
      font-size: 10px;
    }
  }
  </style>
  