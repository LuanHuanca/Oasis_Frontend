<template>
    <div class="TarjetaServicio animate-fade-up">
      <!-- Icono grande a la izquierda para un diseño profesional y dinámico -->
      <Icon class="icono" :icon="icono" :color="colorIcono" width="64" height="64" />
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
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0;
    border-radius: 14px;
    padding: 18px 20px;
    background: linear-gradient(90deg, rgba(223,244,255,1), rgba(239,250,255,0.8));
    gap: 18px;
    box-shadow: 0 8px 20px rgba(7,31,70,0.06);
  }
  .icono{
    margin: 0 12px 0 0 ;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }
  /* Asegurar que el SVG interno del Icon ocupe el tamaño deseado */
  .icono svg{
    width: 64px !important;
    height: 64px !important;
    display: block;
  }

  /* Animaciones simples */
  .animate-fade-up{
    opacity: 0;
    transform: translateY(8px);
    animation: fadeUp 420ms ease forwards;
  }
  @keyframes fadeUp{
    to{ opacity: 1; transform: translateY(0); }
  }
  .Servicio-informacion {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 760px) {
    .icono {
      /* mantener tamaño razonable en móviles */
      width: auto;
    }
    .TarjetaServicio {
      width: 100%;
    }
    .TarjetaServicio h3{
      font-size: 20px;
    }
    .TarjetaServicio p{
      font-size: 10px;
    }
  }
  </style>
  