<template>
  <div class="Inicio2-container">
    <div class="imagen-container">
      <div class="imagen-informacion">
        <h4>Disfruta de los mejores destinos con nuestra agencia de viajes</h4>
        <h1>Explora el Mundo</h1>
        <button>Contactanos</button>
      </div>
    </div>
    <div class="Tarjetas-container">
      <div class="carusel">
        <div class="tarjeta-ciudad">
          <img src="src/assets/Home/carusel/Cochabamba.png" alt="Ciudad de Cochabamba" />
          <span>Cochabamba</span>
        </div>
        <div class="tarjeta-ciudad">
          <img src="src/assets/Home/carusel/La_Paz.png" alt="Ciudad de La Paz" />
          <span>La Paz</span>
        </div>
        <div class="tarjeta-ciudad">
          <img
            src="src/assets/Home/carusel/tarija-nocturna-600.png"
            alt="Ciudad de Tarija"
          />
          <span>Tarija</span>
        </div>
      </div>
      <h2>Otros viajes</h2>
    </div>
  </div>
</template>
<style>
.imagen-container {
  background: url("src/assets/Home/carusel/foto1.jpg");
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 450px;
  justify-content: center;
}
.imagen-informacion {
  color: #fff;
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: right;
  margin-left: 60px;
}
.imagen-informacion button {
  width: 20%;
  padding: 10px;
  margin: 20px 40px;
  background: #0b3d91;
  color: #fff;
  border: 2px solid black;
  border-radius: 20px;
}
.Tarjetas-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin: -120px 0px;
  flex-direction: column;
}

.tarjeta-ciudad img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.tarjeta-ciudad {
  width: 20%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  border-radius: 20px;
}
.carusel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}
.Inicio2-container{
    margin-bottom: 140px;
}
@media (max-width: 700px) {
    
    .carusel{
        width: 100%;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .tarjeta-ciudad{
        width: 220px;
        height: 250px;
    }
    .Tarjetas-container{
        margin: -15% 0px;
    }
    .imagen-informacion button{
        width: fit-content;
    }
}
</style>
