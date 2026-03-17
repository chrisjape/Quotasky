<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const frase = ref('Cargando motivación...')
const autor = ref('')

const obtenerFrase = async () => {
  try {
    const respuesta = await fetch('https://api.quotable.io/random')
    if (!respuesta.ok) throw new Error('Error en la API')
    const datos = await respuesta.json()
    frase.value = datos.content
    autor.value = datos.author
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
  <div class="dashboard">
    <header>
      <h1>Quotasky</h1>
      <div class="user-info">
        <span>{{ authStore.user?.email }}</span>
        <button @click="handleLogout">Cerrar sesión</button>
      </div>
    </header>

    <main>
      <div class="quote-container">
        <blockquote>
          <p>"{{ frase }}"</p>
          <cite>— {{ autor }}</cite>
        </blockquote>
        <button @click="obtenerFrase">Nueva frase</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: #666;
  font-size: 0.9rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #3ecf8e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.quote-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

blockquote p {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 1rem;
}

cite {
  color: #888;
}
</style>