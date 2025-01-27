<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div v-for="(feature, index) in features" :key="index" class="col-md-4">
          <div class="d-flex mb-4 mb-lg-0">
            <div
              class="d-flex flex-shrink-0 align-items-center justify-content-center bg-primary mr-3"
              style="height: 100px; width: 100px"
            >
              <i :class="['fa', `fa-2x fa-${feature.icon}`, 'text-white']"></i>
            </div>
            <div class="d-flex flex-column">
              <h5>{{ feature.title }}</h5>
              <p class="m-0">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Features",
  data() {
    return {
      features: [
        {
          title: "Precio Competitivo",
          icon: "money-check-alt",
          description:
            "Ofrecemos precios competitivos para que puedas encontrar las mejores ofertas en vuelos. Compara tarifas entre diversas aerolíneas y selecciona la opción que mejor se ajuste a tu presupuesto. Nuestra plataforma asegura que obtengas el máximo valor por tu dinero sin comprometer la calidad del servicio.",
        },
        {
          title: "Mejores Servicios",
          icon: "award",
          description:
            "Hemos seleccionado cuidadosamente aerolíneas que destacan por su excelente atención al cliente, comodidad a bordo, y prestaciones adicionales como comidas gourmet, entretenimiento en vuelo, y opciones de asientos premium. Viaja con la tranquilidad de saber que recibirás un servicio de primera clase en cada etapa de tu viaje.",
        },
        {
          title: "Vuelos Agradables",
          icon: "globe",
          description:
            "Encuentra vuelos agradables que te aseguran una experiencia placentera desde el despegue hasta el aterrizaje. Nuestras aerolíneas asociadas se comprometen a ofrecer un ambiente relajado y confortable con asientos espaciosos, cabinas bien equipadas, y un servicio amable y atento. Viaja con estilo y disfruta de cada momento a bordo.",
        },
      ],
    };
  },
};
</script>
