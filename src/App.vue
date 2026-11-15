
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="container nav-content">
        <RouterLink to="/" class="brand">
          <span class="brand-icon">✓</span>
          TaskFlow
        </RouterLink>

        <nav aria-label="Navegación principal">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer>
      <p>TaskFlow © 2026 | Aplicaciones Web - Unidad 3</p>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f7fb;
  color: #18243b;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: min(1100px, 92%);
  margin: 0 auto;
}

.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e9f0;
  padding: 18px 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.brand {
  text-decoration: none;
  color: #2563eb;
  font-size: 25px;
  font-weight: bold;
}

.brand-icon {
  background: #2563eb;
  color: white;
  padding: 5px 10px;
  border-radius: 9px;
  margin-right: 8px;
}

nav {
  display: flex;
  gap: 22px;
}

nav a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #2563eb;
}

main {
  flex: 1;
  padding-top: 40px;
  padding-bottom: 40px;
}

footer {
  text-align: center;
  color: #64748b;
  padding: 20px;
  font-size: 13px;
}

@media (max-width: 600px) {
  .nav-content {
    flex-direction: column;
  }
}
</style>
