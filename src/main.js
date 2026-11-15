
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registro = await navigator.serviceWorker.register(
        '/service-worker.js'
      )

      console.log('Service Worker registrado:', registro.scope)
    } catch (error) {
      console.error('Error al registrar Service Worker:', error)
    }
  })
}
