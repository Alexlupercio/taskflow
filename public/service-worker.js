
const CACHE_NAME = 'taskflow-v2'

const ARCHIVOS = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Instalar y guardar archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARCHIVOS))
  )

  self.skipWaiting()
})

// Activar y limpiar cachés anteriores
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )

  self.clients.claim()
})

// Interceptar peticiones
self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)

  // No interceptar otras páginas ni peticiones externas
  if (url.origin !== self.location.origin) return

  // No guardar respuestas de la API
  if (url.pathname.startsWith('/api/')) return

  // Solo trabajar con peticiones GET
  if (request.method !== 'GET') return

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const copia = response.clone()

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, copia)
          })
        }

        return response
      })
      .catch(async () => {
        // Buscar primero el recurso solicitado
        const recurso = await caches.match(request)

        if (recurso) return recurso

        // Si es una navegación, mostrar la aplicación
        if (request.mode === 'navigate') {
          return caches.match('/')
        }

        return new Response('Recurso no disponible sin conexión', {
          status: 503,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        })
      })
  )
})
