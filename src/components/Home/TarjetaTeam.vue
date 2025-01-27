<template>
    <div class="profile">
      <img :src="imagen" :alt="'Foto de perfil de ' + nombre" />
      <h3>{{ nombre }}</h3>
      <p>{{ cargo }}</p>
      <div class="functionality">
        <a :href="mensajeLink"><img src="src/assets/Home/team/mensaje.png" alt="Mensaje" /></a>
        <a :href="whatsappLink"><img src="src/assets/Home/team/whatsapp.png" alt="WhatsApp" /></a>
        <a :href="githubLink"><img src="src/assets/Home/team/github.png" alt="GitHub" /></a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imagen: {
        type: String,
        required: true
      },
      nombre: {
        type: String,
        required: true
      },
      cargo: {
        type: String,
        required: true
      },
      mensajeLink: {
        type: String,
        default: '#'
      },
      whatsappLink: {
        type: String,
        default: '#'
      },
      githubLink: {
        type: String,
        default: '#'
      }
    }
  };
  </script>
  
  <style>
  .profile {
    width: 20%;
    text-align: center;
    background-color: #fff; 
    padding: 10px 0px; 
    border-radius: 20px; 
    box-shadow: 0px 0px 10px rgba(69, 69, 69, 0.5); /* Sombra suave */
  }
 
  .profile p{
    color: green;
    font-weight: bold;
  }
  .profile img {
    width: 35%;
    height: 47%;
    border-radius: 50%;
  }
  
  .profile .functionality a {
    margin: 0px 5px;
  }
  
  .profile .functionality a img {
    width: 8%;
  }
  
  @media (max-width: 768px) {
    .profile {
      width: 60%;
    }
  }
  </style>
  