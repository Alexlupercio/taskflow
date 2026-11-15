
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

// Configuración del servidor
app.use(cors())
app.use(express.json())

// Conectar las rutas de tareas
const rutasTareas = require('./tareas')
app.use('/api/tareas', rutasTareas)

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor de TaskFlow funcionando correctamente'
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
