<template>
  <div class="agencia-informacion-container">
    <div class="informacion-content">
      <div class="tarjeta-informacion">
        <h2>Visión</h2>
        <p>
          Ser reconocidos como la principal agencia de viajes especializada en
          destinos latinoamericanos, ofreciendo experiencias únicas y memorables
          que conecten a nuestros clientes con la riqueza cultural, la belleza
          natural y la autenticidad de cada país de la región.
        </p>
      </div>
      <div class="tarjeta-informacion">
        <h2>Misión</h2>
        <p>
          En OASIS, nos comprometemos a proporcionar a nuestros clientes
          experiencias de viaje excepcionales a través de un servicio
          personalizado, itinerarios cuidadosamente diseñados y asociaciones con
          proveedores locales de confianza. Nuestro objetivo es inspirar la
          exploración, el descubrimiento y el enriquecimiento cultural, creando
          recuerdos que perduren toda la vida.
        </p>
      </div>
      <div class="tarjeta-informacion">
        <h2>Historia</h2>
        <p>
          OASIS nació de la pasión por explorar Latinoamérica, fundada por
          apasionados viajeros con profundos vínculos regionales. Iniciando
          modestamente en una pequeña oficina, nos hemos convertido en la
          principal agencia de viajes especializada en destinos
          latinoamericanos, comprometidos con ofrecer experiencias únicas y
          auténticas que conecten a nuestros clientes con la riqueza cultural y
          la belleza natural de la región.
        </p>
      </div>
    </div>
  </div>
</template>
<style>
.tarjeta-informacion{
  width: 70%;
  background-color: #fff;
  border: 2px solid #000000;
  border-radius: 15px;
  padding: 20px;
  text-align: justify;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.tarjeta-informacion h2 {
  text-align: center;
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5); /* Agrega un efecto de sombra al texto */
}
.agencia-informacion-container {
  background-color: #bcbbbb;
  padding: 50px 0;
  display: flex;
  justify-content: center;
}

.informacion-content {
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 30px;
}

@media (max-width: 768px) {
  .informacion-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>
