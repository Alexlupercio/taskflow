
<script setup>
// Recibimos las tareas desde HomeView
defineProps({
  tareas: {
    type: Array,
    required: true
  }
})

// Enviamos las acciones al componente principal
const emit = defineEmits(['cambiar-estado', 'eliminar'])
</script>

<template>
  <section class="lista">
    <div class="lista-encabezado">
      <h2>Mis actividades</h2>
      <span>{{ tareas.length }} tareas</span>
    </div>

    <!-- Mensaje cuando no hay tareas -->
    <p v-if="tareas.length === 0" class="vacio">
      Todavía no tienes tareas. ¡Agrega una para comenzar!
    </p>

    <!-- Lista de tareas -->
    <ul v-else>
      <li v-for="tarea in tareas" :key="tarea.id">
        <label class="tarea">
          <input
            type="checkbox"
            :checked="tarea.completada"
            @change="emit('cambiar-estado', tarea.id)"
          />

          <span :class="{ completada: tarea.completada }">
            {{ tarea.titulo }}
          </span>
        </label>

        <button
          type="button"
          @click="emit('eliminar', tarea.id)"
          :aria-label="'Eliminar ' + tarea.titulo"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.lista {
  margin-top: 30px;
}

.lista-encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h2 {
  font-size: 20px;
}

.lista-encabezado span {
  color: #788477;
  font-size: 13px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 16px 5px;
  border-bottom: 1px solid #e5e5dc;
}

.tarea {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tarea input {
  width: 17px;
  height: 17px;
  accent-color: #52765b;
}

.completada {
  text-decoration: line-through;
  color: #9a9f97;
}

button {
  border: none;
  background: #f3e5df;
  color: #a45139;
  padding: 8px 12px;
  border-radius: 7px;
  cursor: pointer;
}

button:hover {
  background: #ead2c8;
}

.vacio {
  color: #858d83;
  padding: 20px 0;
}

@media (max-width: 500px) {
  li {
    gap: 8px;
  }
}
</style>
