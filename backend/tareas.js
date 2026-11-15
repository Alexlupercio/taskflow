
const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

// Archivo donde se guardarán las tareas
const archivoDatos = path.join(__dirname, 'tareas.json')

// Cargar tareas guardadas
function cargarTareas() {
  try {
    if (fs.existsSync(archivoDatos)) {
      const contenido = fs.readFileSync(archivoDatos, 'utf8')
      return JSON.parse(contenido)
    }
  } catch (error) {
    console.error('Error al cargar las tareas:', error)
  }

  return [
    { id: 1, titulo: 'Estudiar Vue 3', completada: false },
    { id: 2, titulo: 'Preparar informe técnico', completada: true }
  ]
}

// Guardar tareas en el archivo JSON
function guardarTareas() {
  fs.writeFileSync(
    archivoDatos,
    JSON.stringify(tareas, null, 2),
    'utf8'
  )
}

let tareas = cargarTareas()

// GET: Consultar todas las tareas
router.get('/', (req, res) => {
  res.json({
    ok: true,
    datos: tareas
  })
})

// POST: Crear una tarea
router.post('/', (req, res) => {
  const { titulo } = req.body

  if (typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El título de la tarea es obligatorio'
    })
  }

  const nuevaTarea = {
    id: Date.now(),
    titulo: titulo.trim(),
    completada: false
  }

  tareas.push(nuevaTarea)
  guardarTareas()

  res.status(201).json({
    ok: true,
    mensaje: 'Tarea creada correctamente',
    datos: nuevaTarea
  })
})

// POST: Recuperar una tarea eliminada
router.post('/restaurar', (req, res) => {
  const { id, titulo, completada } = req.body

  if (
    !Number.isSafeInteger(id) ||
    typeof titulo !== 'string' ||
    !titulo.trim() ||
    typeof completada !== 'boolean'
  ) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Los datos de la tarea no son válidos'
    })
  }

  const existe = tareas.some(t => t.id === id)

  if (existe) {
    return res.status(409).json({
      ok: false,
      mensaje: 'La tarea ya existe'
    })
  }

  const tareaRecuperada = {
    id,
    titulo: titulo.trim(),
    completada
  }

  tareas.push(tareaRecuperada)
  guardarTareas()

  res.status(201).json({
    ok: true,
    mensaje: 'Tarea recuperada correctamente',
    datos: tareaRecuperada
  })
})

// PUT: Actualizar una tarea
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { titulo, completada } = req.body

  const tarea = tareas.find(t => t.id === id)

  if (!tarea) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Tarea no encontrada'
    })
  }

  if (titulo !== undefined) {
    if (typeof titulo !== 'string' || !titulo.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El título no puede estar vacío'
      })
    }

    tarea.titulo = titulo.trim()
  }

  if (completada !== undefined) {
    if (typeof completada !== 'boolean') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El estado debe ser verdadero o falso'
      })
    }

    tarea.completada = completada
  }

  guardarTareas()

  res.json({
    ok: true,
    mensaje: 'Tarea actualizada correctamente',
    datos: tarea
  })
})

// DELETE: Eliminar una tarea
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  const tareaEliminada = tareas.find(t => t.id === id)

  if (!tareaEliminada) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Tarea no encontrada'
    })
  }

  tareas = tareas.filter(t => t.id !== id)
  guardarTareas()

  res.json({
    ok: true,
    mensaje: 'Tarea eliminada correctamente',
    datos: tareaEliminada
  })
})

module.exports = router
