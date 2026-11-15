
const API_URL = 'http://localhost:3000/api/tareas'

// Revisar y validar la respuesta del servidor
async function revisarRespuesta(response) {
  let resultado

  try {
    resultado = await response.json()
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida')
  }

  if (!response.ok || !resultado.ok) {
    throw new Error(
      resultado.mensaje || `Error del servidor: ${response.status}`
    )
  }

  return resultado
}

// Consultar todas las tareas
export async function obtenerTareas(signal) {
  const response = await fetch(API_URL, {
    method: 'GET',
    signal
  })

  const resultado = await revisarRespuesta(response)
  return resultado.datos
}

// Agregar una tarea
export async function crearTarea(titulo, signal) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ titulo }),
    signal
  })

  const resultado = await revisarRespuesta(response)
  return resultado.datos
}

// Actualizar una tarea
export async function actualizarTarea(id, datos, signal) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos),
    signal
  })

  const resultado = await revisarRespuesta(response)
  return resultado.datos
}

// Eliminar una tarea
export async function eliminarTarea(id, signal) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    signal
  })

  return revisarRespuesta(response)
}

// Recuperar una tarea eliminada
export async function restaurarTarea(tarea) {
  const response = await fetch(`${API_URL}/restaurar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tarea)
  })

  const resultado = await revisarRespuesta(response)
  return resultado.datos
}
