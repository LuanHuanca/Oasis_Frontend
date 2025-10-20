<template>
  <section class="agencia-informacion" role="region" aria-label="Información de la agencia OASIS">
    <div class="container">
      <header class="section-header">
        <h1>Sobre OASIS</h1>
        <p class="subtitle">Tu puerta a experiencias auténticas en Latinoamérica</p>
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
            En OASIS, nos comprometemos a proporcionar a nuestros clientes
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
            OASIS nació de la pasión por explorar Latinoamérica, fundada por
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
  --card-bg: #ffffff;
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

.section-header .subtitle{
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}

.cards{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.card{
  background: var(--card-bg);
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 6px 18px rgba(7, 31, 70, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.04);
  transition: transform 180ms ease, box-shadow 180ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

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
