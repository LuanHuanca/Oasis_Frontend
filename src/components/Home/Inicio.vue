<template>
    <div class="welcome-view">
      <div class="welcome-text">
        <h1>Explora y vive: <br> Tu Pasaporte a la <br>Aventura</h1>
        <p>
          Explora un universo de experiencias únicas con Oasis Viajes. Desde
          destinos exóticos hasta joyas ocultas, te llevamos a descubrir lo
          extraordinario en cada rincón del mundo.
        </p>
      </div>
      <img class="aventurero" src="/src/assets/Home/mochilero.png" alt="Aventurero">
    </div>
</template>


<style lang="css" scoped>
.welcome-view{
  background: url(/src/assets/Home/fondo.png);
  background-size: cover; /* La imagen se expandirá para cubrir todo el contenedor sin distorsionarla */
  background-repeat: no-repeat; /* Evita la repetición de la imagen de fondo */
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.welcome-text{
  width: 50%;
}
.welcome-text p{
  font-size: 28px
}
.welcome-view h1{
  font-size: 60px;
  font-weight: bold;
}
.aventurero{
  width: 40%;
}
@media (max-width: 700px) {
  .welcome-view{
    height: fit-content;
    padding: 20px;
  }
  .welcome-text{
    width: 50%;
  }
  .welcome-view h1{
    font-size: 30px;
  }
  .welcome-text p{
    font-size: 15px;
  }
  .aventurero img{
    height: 80%;
  }
}
</style>
