
<script setup>
import { ref } from 'vue'

const titulo = ref('')
const error = ref('')

const emit = defineEmits(['agregar'])

function enviarFormulario() {
  const texto = titulo.value.trim()

  if (!texto) {
    error.value = 'Por favor, escribe una tarea antes de continuar.'
    return
  }

  emit('agregar', texto)
  titulo.value = ''
  error.value = ''
}
</script>

<template>
  <form @submit.prevent="enviarFormulario" novalidate>
    <label for="titulo">Nueva tarea</label>

    <div class="formulario">
      <input
        id="titulo"
        v-model="titulo"
        type="text"
        maxlength="100"
        placeholder="¿Qué necesitas hacer?"
        :aria-invalid="!!error"
        aria-describedby="error-titulo"
        @input="error = ''"
      />

      <button type="submit">+ Agregar</button>
    </div>

    <p
      v-if="error"
      id="error-titulo"
      class="error"
      role="alert"
    >
      {{ error }}
    </p>
  </form>
</template>

<style scoped>
form {
  width: 100%;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.formulario {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  min-width: 0;
  padding: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

input:focus {
  outline: 2px solid #52765b;
  outline-offset: 2px;
}

input[aria-invalid="true"] {
  border-color: #a45139;
}

button {
  padding: 12px 20px;
  background: #354d3d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #263a2d;
}

.error {
  color: #a45139;
  font-size: 13px;
  margin-top: 9px;
}

@media (max-width: 500px) {
  .formulario {
    flex-direction: column;
  }
}
</style>
