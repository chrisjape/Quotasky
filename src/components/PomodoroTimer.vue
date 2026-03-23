<script setup>
import { ref, computed, onUnmounted } from 'vue'

const MODOS = {
  trabajo: 25 * 60,
  descanso: 5 * 60,
  descansoLargo: 15 * 60,
}

const modo = ref('trabajo')
const segundosRestantes = ref(MODOS.trabajo)
const corriendo = ref(false)
const sesionesHoy = ref(0)
let intervalo = null

const tiempoFormateado = computed(() => {
  const minutos = Math.floor(segundosRestantes.value / 60)
  const segundos = segundosRestantes.value % 60
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
})

const iniciar = () => {
  if (corriendo.value) return
  corriendo.value = true
  intervalo = setInterval(() => {
    if (segundosRestantes.value > 0) {
      segundosRestantes.value--
      document.title = `${tiempoFormateado.value} — Quotasky`
    } else {
      clearInterval(intervalo)
      corriendo.value = false
      document.title = 'Quotasky'
      if (modo.value === 'trabajo') sesionesHoy.value++
      alert(modo.value === 'trabajo' ? '¡Tiempo de descanso! 🎉' : '¡De vuelta al trabajo! 💪')
    }
  }, 1000)
}

const pausar = () => {
  clearInterval(intervalo)
  corriendo.value = false
}

const reiniciar = () => {
  clearInterval(intervalo)
  corriendo.value = false
  segundosRestantes.value = MODOS[modo.value]
  document.title = 'Quotasky'
}

const cambiarModo = (nuevoModo) => {
  pausar()
  modo.value = nuevoModo
  segundosRestantes.value = MODOS[nuevoModo]
}

onUnmounted(() => {
  clearInterval(intervalo)
  document.title = 'Quotasky'
})

defineExpose({ sesionesHoy })
</script>

<template>
  <div class="timer">
    <div class="modo-btns">
      <button :class="{ activo: modo === 'trabajo' }" @click="cambiarModo('trabajo')">Trabajo</button>
      <button :class="{ activo: modo === 'descanso' }" @click="cambiarModo('descanso')">Descanso</button>
      <button :class="{ activo: modo === 'descansoLargo' }" @click="cambiarModo('descansoLargo')">Descanso largo</button>
    </div>

    <div class="time">{{ tiempoFormateado }}</div>

    <div class="buttons">
      <button @click="iniciar" :disabled="corriendo">Start</button>
      <button @click="pausar" :disabled="!corriendo">Pause</button>
      <button @click="reiniciar">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.timer {
  text-align: center;
  margin-bottom: 20px;
}

.modo-btns {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
}

.modo-btns button {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 11px;
}

.modo-btns button.activo {
  background: #a1d69d;
}

.time {
  font-size: 48px;
  margin: 10px 0;
  font-weight: bold;
  letter-spacing: 2px;
}

.buttons button {
  background: #a1d69d;
  border: none;
  color: white;
  padding: 8px 12px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.buttons button:hover:not(:disabled) {
  background: #66b850;
}

.buttons button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>