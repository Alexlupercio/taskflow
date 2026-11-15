
<script setup>
// Recibimos los números desde HomeView
defineProps({
  total: Number,
  completadas: Number,
  pendientes: Number
})
</script>

<template>
  <section class="estadisticas">
    <div class="tarjeta">
      <span>Total de tareas</span>
      <strong>{{ total }}</strong>
    </div>

    <div class="tarjeta">
      <span>Completadas</span>
      <strong>{{ completadas }}</strong>
    </div>

    <div class="tarjeta">
      <span>Pendientes</span>
      <strong>{{ pendientes }}</strong>
    </div>
  </section>
</template>

<style scoped>
.estadisticas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 25px 0;
}

.tarjeta {
  background: white;
  border: 1px solid #e5e5dc;
  border-radius: 10px;
  padding: 20px;
}

.tarjeta span {
  display: block;
  color: #788477;
  font-size: 14px;
}

.tarjeta strong {
  display: block;
  font-size: 28px;
  margin-top: 12px;
  color: #354d3d;
}

@media (max-width: 600px) {
  .estadisticas {
    grid-template-columns: 1fr;
  }
}
</style>
