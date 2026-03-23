<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import PomodoroTimer from '../components/PomodoroTimer.vue'
import TaskList from '../components/TaskList.vue'

const timerRef = ref(null)
const authStore = useAuthStore()
const router = useRouter()

const frase = ref('Cargando motivación...')
const autor = ref('')

const obtenerFrase = async () => {
  try {
    const respuesta = await fetch('https://quotes-api-production-d6a7.up.railway.app/quotes/random')
    const datos = await respuesta.json()
    if (!datos.success) throw new Error(datos.message)
    frase.value = datos.data.text
    autor.value = datos.data.author
  } catch (error) {
    frase.value = "La disciplina es el puente entre metas y logros."
    autor.value = "Jim Rohn"
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  obtenerFrase()
})
</script>

<template>
  <div class="body-wrapper">
    <div class="app">

      <div class="header">
        <div>☁️ Quotasky</div>
        <div class="user-area">
          <span>{{ authStore.user?.email }}</span>
          <button class="logout-btn" @click="handleLogout">Salir</button>
        </div>
      </div>

      <div class="quote">
        <p>"{{ frase }}"</p>
        <cite>— {{ autor }}</cite>
        <div class="new-quote" @click="obtenerFrase">↻ Nueva frase</div>
      </div>

      <PomodoroTimer ref="timerRef" />

      <TaskList />

      <div class="stats">
   Sesiones hoy: {{ timerRef?.sesionesHoy ?? 0 }}
</div>

    </div>
  </div>
</template>

<style scoped>
.body-wrapper {
  background: linear-gradient(to bottom, #9dd6ad, #88c5a1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  width: 350px;
  background: #1e293b;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-area span {
  font-size: 11px;
  opacity: 0.7;
  font-weight: normal;
}

.logout-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}

.logout-btn:hover {
  background: rgba(255,255,255,0.2);
}

.quote {
  background: rgba(255,255,255,0.08);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  opacity: 0.9;
}

.quote cite {
  font-size: 12px;
  opacity: 0.7;
  display: block;
  margin-top: 4px;
}

.new-quote {
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.6;
  cursor: pointer;
}

.new-quote:hover {
  opacity: 1;
}

.timer {
  text-align: center;
  margin-bottom: 20px;
}

.time {
  font-size: 48px;
  margin: 10px 0;
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

.buttons button:hover {
  background: #66b850;
}

.tasks {
  margin-bottom: 20px;
}

.tasks h3 {
  margin-bottom: 10px;
}

.task {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
}

.task input {
  margin-right: 8px;
}

.add-task {
  margin-top: 10px;
  padding: 8px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.add-task:hover {
  background: rgba(255,255,255,0.2);
}

.stats {
  background: rgba(255,255,255,0.08);
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
}
</style>