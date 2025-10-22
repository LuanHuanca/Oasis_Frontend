<template>
  <section class="agencia-informacion" role="region" aria-label="Información de la agencia tuguia">
    <div class="container">
      <header class="section-header">
<<<<<<< HEAD
        <h1>Sobre TU GUIA</h1>
        <p class="subtitle">Tu puerta a experiencias auténticas e inolvidables en Latinoamérica</p>
=======
  <h1>Sobre TU GUIA</h1>
  <p class="subtitle">Tu puerta a experiencias auténticas e inolvidables en Latinoamérica</p>
>>>>>>> origin/main
      </header>

      <div class="cards">
        <article class="card" aria-labelledby="vision-title">
          <div class="card-icon" aria-hidden="true">🌎</div>
          <h2 id="vision-title">Visión</h2>
          <p>
            Ser reconocidos como la principal agencia de viajes especializada en
            destinos latinoamericanos, ofreciendo experiencias únicas y memorables
            que conecten a nuestros clientes con la riqueza cultural, la belleza
            natural y la autenticidad de cada país de la región.
          </p>
        </article>

        <article class="card" aria-labelledby="mision-title">
          <div class="card-icon" aria-hidden="true">🤝</div>
          <h2 id="mision-title">Misión</h2>
          <p>
            En TU GUIA, nos comprometemos a proporcionar a nuestros clientes
            experiencias de viaje excepcionales a través de un servicio
            personalizado, itinerarios cuidadosamente diseñados y asociaciones con
            proveedores locales de confianza. Nuestro objetivo es inspirar la
            exploración, el descubrimiento y el enriquecimiento cultural, creando
            recuerdos que perduren toda la vida.
          </p>
        </article>

        <article class="card" aria-labelledby="historia-title">
          <div class="card-icon" aria-hidden="true">🧭</div>
          <h2 id="historia-title">Historia</h2>
          <p>
            TU GUIA nació de la pasión por explorar Latinoamérica, fundada por
            apasionados viajeros con profundos vínculos regionales. Iniciando
            modestamente en una pequeña oficina, nos hemos convertido en la
            principal agencia de viajes especializada en destinos
            latinoamericanos, comprometidos con ofrecer experiencias únicas y
            auténticas que conecten a nuestros clientes con la riqueza cultural y
            la belleza natural de la región.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
:root{
  --bg-gradient-start: #f6fbff;
  --bg-gradient-end: #eef6ff;
  /* color celeste claro para las tarjetas */
  --card-bg: #dff4ff;
  --card-accent: #bfeeff;
  --accent: #0b6ef6;
  --muted: #6b7280;
}

.agencia-informacion{
  background: linear-gradient(180deg, var(--bg-gradient-start), var(--bg-gradient-end));
  padding: 48px 16px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  color: #111827;
}

.container{
  max-width: 1100px;
  margin: 0 auto;
}

.section-header{
  text-align: center;
  margin-bottom: 28px;
}

.section-header h1{
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.4px;
}

.section-header h1{ color: #0b4fd6; }

.section-header .subtitle{
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}

.cards{
  display: grid;
  /* dar más protagonismo al espacio horizontal: columna izquierda ligeramente más amplia */
  grid-template-columns: 1.2fr 1fr 0.9fr;
  gap: 20px;
  align-items: stretch;
}

.card{
  /* color celeste aplicado directamente para evitar problemas con scoped :root */
  background: #dff4ff;
  border-radius: 12px;
  /* más espacio hacia los lados (izquierdo/predominante) */
  padding: 22px 18px 22px 36px;
  box-shadow: 0 6px 18px rgba(7, 31, 70, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.04);
  transition: transform 180ms ease, box-shadow 180ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: visible;
}

/* staggered animation for cards */
.cards .card{ opacity:0; transform: translateY(10px); animation: cardIn 480ms ease forwards; }
.cards .card:nth-child(1){ animation-delay: 60ms; }
.cards .card:nth-child(2){ animation-delay: 140ms; }
.cards .card:nth-child(3){ animation-delay: 220ms; }
@keyframes cardIn{ to{ opacity:1; transform: translateY(0); } }

.card:hover{
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(7, 31, 70, 0.12);
}

.card-icon{
  font-size: 28px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(11,110,246,0.12), rgba(11,110,246,0.06));
}

.card h2{
  margin: 0;
  font-size: 18px;
  color: #0f172a;
}

.card p{
  margin: 0;
  color: #374151;
  line-height: 1.6;
  font-size: 14px;
}

/* Acentos asimétricos: la primera tarjeta sobresale ligeramente por la izquierda,
   la última por la derecha, aprovechando el espacio lateral */
.card::before{
  content: '';
  position: absolute;
  top: 12px;
  bottom: 12px;
  width: 14px;
  left: -8px;
  border-radius: 8px;
  /* color de acento celeste directo */
  background: linear-gradient(180deg, #bfeeff, rgba(255,255,255,0));
  opacity: 0.95;
  transform: skewY(-6deg);
  pointer-events: none;
}

.card:last-child::before{
  left: auto;
  right: -8px;
  transform: skewY(6deg);
}

/* Aumentar el padding horizontal de la primera y última tarjeta para enfatizar los lados */
.cards > .card:first-child{ padding-left: 48px; }
.cards > .card:last-child{ padding-right: 48px; }

@media (max-width: 920px){
  .cards{
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px){
  .section-header h1{ font-size: 22px; }
  .cards{ grid-template-columns: 1fr; }
  .container{ padding: 0 8px; }
}

</style>
