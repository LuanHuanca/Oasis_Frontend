<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-lg-6" style="min-height: 500px">
          <div class="position-relative h-100">
            <img
              class="position-absolute w-100 h-100"
              :src="aboutImage"
              style="object-fit: cover"
            />
          </div>
        </div>
        <div class="col-lg-6 ">
          <div class="about-text bg-white p-4 p-lg-5 my-lg-5">
            <h6 class="text-primary text-uppercase" style="letter-spacing: 5px">
              Sobre Nosotros
            </h6>
            <h1 class="mb-3">
              Ofrecemos los mejores paquetes turísticos dentro de su presupuesto
            </h1>
            <p>
              Descubre los mejores paquetes turísticos adaptados a tu presupuesto, combinando calidad y economía para unas vacaciones inolvidables.
            </p>
            <div class="row mb-4">
              <div class="col-6">
                <img
                  class="img-fluid"
                  :src="aboutImage1"
                  alt=""
                />
              </div>
              <div class="col-6">
                <img
                  class="img-fluid"
                  :src="aboutImage2"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aboutImage from '@/assets/vuelos/about.jpg';
import aboutImage1 from '@/assets/vuelos/about-1.jpg';
import aboutImage2 from '@/assets/vuelos/about-2.jpg';

export default {
  name: 'About',
  data() {
    return {
      aboutImage,
      aboutImage1,
      aboutImage2
    };
  }
};
</script>

<style>
.container-fluid{
    padding: 20px 0px 20px 0px;
}
</style>