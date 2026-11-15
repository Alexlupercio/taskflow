
<template>
  <main class="about-page">

    <!-- Presentación -->
    <section class="hero">
      <div class="logo-icon">✓</div>

      <span class="etiqueta">CONOCE TASKFLOW</span>

      <h1>
        Organiza tus tareas,<br />
        mantén todo bajo control.
      </h1>

      <p class="descripcion">
        TaskFlow es una aplicación web diseñada para ayudarte a
        organizar tus actividades, consultar tus tareas pendientes
        y llevar un seguimiento de las que ya has completado,
        todo desde un mismo lugar.
      </p>
    </section>

    <!-- Funcionalidades -->
    <section class="funcionalidades">
      <h2>¿Qué puedes hacer con TaskFlow?</h2>

      <div class="tarjetas">

        <article class="tarjeta">
          <span class="numero">01</span>
          <h3>Organizar tareas</h3>
          <p>
            Agrega actividades y mantén tus pendientes
            organizados en un solo lugar.
          </p>
        </article>

        <article class="tarjeta">
          <span class="numero">02</span>
          <h3>Controlar avances</h3>
          <p>
            Marca tus actividades como completadas y
            consulta tus estadísticas.
          </p>
        </article>

        <article class="tarjeta">
          <span class="numero">03</span>
          <h3>Disponible donde lo necesites</h3>
          <p>
            Instala la aplicación en tu dispositivo y consulta
            tus tareas desde un mismo lugar.
          </p>
        </article>

      </div>
    </section>

    <!-- Tecnologías -->
    <section class="tecnologias">
      <h2>Tecnologías utilizadas</h2>

      <p>
        El proyecto fue desarrollado utilizando Vue 3,
        JavaScript, Node.js y Express. También incorpora
        una API REST y configuración PWA mediante
        Service Worker y Web App Manifest.
      </p>
    </section>

    <!-- Pie de página -->
    <footer class="footer">
      <strong>TaskFlow</strong>
      <span>Aplicaciones Web · Unidad 3 · 2026</span>
      <span>Universidad Politécnica Salesiana</span>
    </footer>

  </main>
</template>

<style scoped>
.about-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 80px 24px 55px;
  background: #f5f7fb;
  color: #18243b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Presentación */
.hero {
  width: 100%;
  max-width: 720px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-icon {
  width: 66px;
  height: 66px;
  background: #2563eb;
  color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 43px;
  margin-bottom: 20px;
}

.etiqueta {
  color: #52765b;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: 38px;
  line-height: 1.2;
  margin: 0 0 22px;
  font-weight: 750;
}

.descripcion {
  max-width: 650px;
  color: #788477;
  font-size: 15px;
  line-height: 1.9;
  margin: 0;
}

/* Funcionalidades */
.funcionalidades {
  width: 100%;
  max-width: 1100px;
  margin-top: 80px;
}

.funcionalidades h2 {
  font-size: 22px;
  margin: 0 0 20px;
}

.tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tarjeta {
  background: #fffefa;
  border: 1px solid #e5e5dc;
  border-radius: 12px;
  padding: 25px 22px;
  min-height: 145px;
}

.numero {
  color: #52765b;
  font-size: 12px;
  font-weight: bold;
}

.tarjeta h3 {
  font-size: 17px;
  margin: 17px 0 12px;
}

.tarjeta p {
  color: #788477;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

/* Tecnologías */
.tecnologias {
  width: 100%;
  max-width: 1100px;
  background: #e2e9dc;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
}

.tecnologias h2 {
  font-size: 18px;
  margin: 0 0 12px;
}

.tecnologias p {
  color: #788477;
  font-size: 14px;
  line-height: 1.8;
  margin: 0;
}

/* Pie de página */
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 45px;
  color: #788477;
  font-size: 12px;
  text-align: center;
}

.footer strong {
  color: #354d3d;
  font-size: 15px;
}

/* Adaptación a móviles */
@media (max-width: 700px) {
  .about-page {
    padding: 55px 18px 35px;
  }

  .hero h1 {
    font-size: 29px;
  }

  .descripcion {
    font-size: 14px;
  }

  .funcionalidades {
    margin-top: 55px;
  }

  .tarjetas {
    grid-template-columns: 1fr;
  }

  .tarjeta {
    min-height: auto;
  }
}

@media (min-width: 701px) and (max-width: 950px) {
  .tarjetas {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
