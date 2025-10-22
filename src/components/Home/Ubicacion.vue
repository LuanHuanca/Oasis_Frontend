<template>
  <div class="ubicacion-contenedor">
    <div class="ubicacion-informacion-contenedor">
      <h2>Ubicacion</h2>
      <p>Av. 14 de Septiembre Nº 4807 esquina, La Paz</p>
      <div class="social">
        <img src="src/assets/Home/team/mensaje.png" alt="" width="30">
        <p>agencia.viajes.oasis@gmail.com</p>
      </div>
      <div class="social">
        <img src="src/assets/Home/facebook.png" alt="" width="30">
        <p>Agencia de Viajes TU GUIA</p>
      </div>
      <div class="social">
        <img src="src/assets/Home/instagram.png" alt="" width="30">
        <p>Agency.TuGuia</p>
      </div>
      <div class="social">
        <img src="src/assets/Home/telefono.png" alt="" width="30">
        <p>(+591) 68171114</p>
      </div>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6433.014190351745!2d-68.11247525645385!3d-16.52139569965759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1713419087361!5m2!1ses-419!2sbo"
      style="border: 0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>
<style>
.ubicacion-contenedor {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  background: #ebebeb;
}
.ubicacion-informacion-contenedor {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  padding-left: 60px;
}
.ubicacion-contenedor iframe {
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 80%;
  margin: 20px;
}
.social{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.social p{
  margin-top: 10px;
  padding-left: 15px;
}
</style>
