
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import TaskStats from '../components/TaskStats.vue'

import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  restaurarTarea
} from '../services/tareasService'

// Lista de tareas
const tareas = ref([])

// Estados de la aplicación
const cargando = ref(true)
const error = ref('')

// Notificaciones
const mensajeNotificacion = ref('')
const tareaEliminadaPendiente = ref(null)

// Control de peticiones
let numeroCarga = 0
let versionDatos = 0
let creandoTarea = false
let controladorCarga = null
let temporizadorNotificacion = null

const tareasEnProceso = new Set()

// Estadísticas
const total = computed(() => tareas.value.length)

const completadas = computed(() =>
  tareas.value.filter(tarea => tarea.completada).length
)

const pendientes = computed(() =>
  total.value - completadas.value
)

// Mostrar notificación
function mostrarNotificacion(mensaje, permitirDeshacer = false) {
  clearTimeout(temporizadorNotificacion)

  mensajeNotificacion.value = mensaje

  if (!permitirDeshacer) {
    tareaEliminadaPendiente.value = null
  }

  temporizadorNotificacion = setTimeout(() => {
    mensajeNotificacion.value = ''
    tareaEliminadaPendiente.value = null
  }, 5000)
}

// Obtener mensaje de error
function obtenerMensajeError(err, accion) {
  if (!navigator.onLine || err.message === 'Failed to fetch') {
    return `No hay conexión con el servidor. No se pudo ${accion}.`
  }

  return err.message || 'Ocurrió un error inesperado.'
}

// Consultar tareas
async function cargarTareas() {
  if (controladorCarga) {
    controladorCarga.abort()
  }

  controladorCarga = new AbortController()

  const cargaActual = ++numeroCarga
  const versionActual = versionDatos

  cargando.value = true
  error.value = ''

  try {
    const datos = await obtenerTareas(controladorCarga.signal)

    if (
      cargaActual !== numeroCarga ||
      versionActual !== versionDatos
    ) {
      return
    }

    tareas.value = datos

  } catch (err) {
    if (err.name === 'AbortError') return

    if (
      cargaActual === numeroCarga &&
      versionActual === versionDatos
    ) {
      error.value = obtenerMensajeError(err, 'cargar las tareas')
    }

  } finally {
    if (cargaActual === numeroCarga) {
      cargando.value = false
      controladorCarga = null
    }
  }
}

// Agregar tarea
async function agregarTarea(titulo) {
  if (creandoTarea) return

  creandoTarea = true
  error.value = ''

  try {
    const nueva = await crearTarea(titulo)

    versionDatos++

    tareas.value = [...tareas.value, nueva]

    mostrarNotificacion('Tarea agregada correctamente.')

  } catch (err) {
    error.value = obtenerMensajeError(err, 'agregar la tarea')

  } finally {
    creandoTarea = false
  }
}

// Cambiar estado
async function cambiarEstado(id) {
  if (tareasEnProceso.has(id)) return

  const tarea = tareas.value.find(t => t.id === id)

  if (!tarea) return

  tareasEnProceso.add(id)
  error.value = ''

  try {
    const actualizada = await actualizarTarea(id, {
      titulo: tarea.titulo,
      completada: !tarea.completada
    })

    versionDatos++

    tareas.value = tareas.value.map(t =>
      t.id === id ? actualizada : t
    )

    mostrarNotificacion(
      actualizada.completada
        ? 'Tarea completada correctamente.'
        : 'Tarea marcada como pendiente.'
    )

  } catch (err) {
    error.value = obtenerMensajeError(err, 'actualizar la tarea')

  } finally {
    tareasEnProceso.delete(id)
  }
}

// Eliminar tarea
async function eliminarTareaLocal(id) {
  if (tareasEnProceso.has(id)) return

  const indice = tareas.value.findIndex(t => t.id === id)

  if (indice === -1) return

  const tarea = tareas.value[indice]

  tareasEnProceso.add(id)
  error.value = ''

  try {
    const resultado = await eliminarTarea(id)

    versionDatos++

    tareas.value = tareas.value.filter(t => t.id !== id)

    // Guardar los datos originales para recuperarlos
    tareaEliminadaPendiente.value = {
      ...resultado.datos,
      indice
    }

    mostrarNotificacion(
      'Tarea eliminada correctamente.',
      true
    )

  } catch (err) {
    error.value = obtenerMensajeError(err, 'eliminar la tarea')

  } finally {
    tareasEnProceso.delete(id)
  }
}

// Recuperar tarea eliminada
async function deshacerEliminacion() {
  const pendiente = tareaEliminadaPendiente.value

  if (!pendiente) return

  clearTimeout(temporizadorNotificacion)
  mensajeNotificacion.value = ''
  tareaEliminadaPendiente.value = null

  try {
    const recuperada = await restaurarTarea({
      id: pendiente.id,
      titulo: pendiente.titulo,
      completada: pendiente.completada
    })

    versionDatos++

    const posicion = Math.min(
      pendiente.indice,
      tareas.value.length
    )

    tareas.value.splice(posicion, 0, recuperada)

    mostrarNotificacion('Tarea recuperada correctamente.')

  } catch (err) {
    error.value = obtenerMensajeError(err, 'recuperar la tarea')
  }
}

// Cargar tareas al abrir
onMounted(() => {
  cargarTareas()
})

// Limpiar recursos al abandonar la vista
onBeforeUnmount(() => {
  numeroCarga++

  if (controladorCarga) {
    controladorCarga.abort()
  }

  clearTimeout(temporizadorNotificacion)
})
</script>

<template>
  <section class="panel">

    <div class="encabezado">
      <div>
        <h1>Mis tareas</h1>
        <p>Organiza tus actividades y mantén todo bajo control.</p>
      </div>

      <span class="etiqueta">Mi espacio personal</span>
    </div>

    <!-- Mensaje de carga -->
    <p v-if="cargando" class="mensaje" role="status">
      Cargando tus tareas...
    </p>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="error" role="alert">
      <p>{{ error }}</p>

      <button type="button" @click="cargarTareas">
        Intentar de nuevo
      </button>
    </div>

    <template v-else>

      <!-- Estadísticas -->
      <TaskStats
        :total="total"
        :completadas="completadas"
        :pendientes="pendientes"
      />

      <!-- Formulario y lista -->
      <div class="contenido">

        <TaskForm @agregar="agregarTarea" />

        <TaskList
          :tareas="tareas"
          @cambiar-estado="cambiarEstado"
          @eliminar="eliminarTareaLocal"
        />

      </div>

    </template>

    <!-- Notificación tipo Toast -->
    <Transition name="toast">
      <div
        v-if="mensajeNotificacion"
        class="toast"
        role="status"
        aria-live="polite"
      >
        <div class="toast-mensaje">
          <span class="check">✓</span>
          <span>{{ mensajeNotificacion }}</span>
        </div>

        <button
          v-if="tareaEliminadaPendiente"
          type="button"
          class="deshacer"
          @click="deshacerEliminacion"
        >
          <span>↶</span> Deshacer
        </button>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
.panel {
  width: 100%;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

h1 {
  font-size: 30px;
  margin: 0 0 9px;
}

.encabezado p {
  color: #788477;
  margin: 0;
}

.etiqueta {
  background: #e2e9dc;
  color: #354d3d;
  padding: 9px 14px;
  border-radius: 20px;
  font-size: 12px;
}

.contenido {
  background: #fffefa;
  border: 1px solid #e5e5dc;
  border-radius: 12px;
  padding: 24px;
}

.mensaje {
  color: #788477;
  padding: 25px 0;
}

.error {
  background: #fff0ed;
  color: #a45139;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
}

.error button {
  background: #354d3d;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 9px 14px;
  cursor: pointer;
}

/* Notificación */
.toast {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  min-width: 300px;
  max-width: calc(100vw - 40px);
  padding: 15px 18px;
  background: #263a2d;
  color: white;
  border-radius: 11px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
}

.toast-mensaje {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.check {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: #52765b;
  border-radius: 50%;
  font-weight: bold;
}

.deshacer {
  background: transparent;
  border: none;
  color: #b9d9bd;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
}

.deshacer:hover {
  color: white;
  text-decoration: underline;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

@media (max-width: 600px) {
  .encabezado {
    align-items: flex-start;
    flex-direction: column;
  }

  .contenido {
    padding: 16px;
  }

  .toast {
    right: 15px;
    bottom: 15px;
    left: 15px;
    min-width: 0;
    max-width: none;
    gap: 10px;
    padding: 13px;
  }
}
</style>
