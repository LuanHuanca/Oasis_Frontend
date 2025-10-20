<template>
  <div class="container-fluid py-5">
    <div class="container pt-5">
      <div class="text-center mb-3">
        <h6 class="text-primary text-uppercase" style="letter-spacing: 5px">
          Servicios
        </h6>
        <h1>Servicios de Tour y Viajes</h1>
      </div>
      <div class="row modern-services">
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="service-card">
            <div class="service-icon">✈️</div>
            <div class="service-body">
              <h5>Guía de Viaje</h5>
              <p>
                Encuentra toda la información que necesitas para tu próximo destino con nuestras completas guías de viaje. Desde recomendaciones de lugares turísticos imperdibles hasta consejos prácticos sobre transporte y cultura local.
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 mb-4">
          <div class="service-card">
            <div class="service-icon">🎫</div>
            <div class="service-body">
              <h5>Reserva de boletos</h5>
              <p>
                Facilitamos la reserva de boletos de avión de manera rápida y sencilla. Compara precios entre múltiples aerolíneas y reserva tus boletos con unos pocos clics.
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 mb-4">
          <div class="service-card">
            <div class="service-icon">🏨</div>
            <div class="service-body">
              <h5>Reserva de Hoteles</h5>
              <p>
                Encuentra y reserva el alojamiento perfecto con nuestra amplia selección de hoteles; opciones para todos los presupuestos y preferencias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modern-services{ gap: 18px; }
.service-card{
  display:flex; align-items:flex-start; gap:16px;
  background: linear-gradient(180deg, #ffffff, #f3fbff);
  border-radius: 12px; padding: 20px; box-shadow: 0 10px 30px rgba(11,70,120,0.06);
  transition: transform 220ms cubic-bezier(.2,.9,.2,1), box-shadow 220ms ease;
}
.service-card:hover{ transform: translateY(-8px); box-shadow: 0 20px 46px rgba(11,70,120,0.12); }
.service-icon{ font-size:34px; width:64px; height:64px; display:flex; align-items:center; justify-content:center; border-radius:10px; background: linear-gradient(135deg,#dff4ff,#bfeeff); }
.service-body h5{ margin:0 0 6px 0; font-size:18px; color:#07335f; }
.service-body p{ margin:0; color:#475569; line-height:1.6; }
@media (max-width: 960px){ .service-card{ padding:16px } }
</style>
