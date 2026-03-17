<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLogin = ref(true)
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.login(email.value, password.value)
  } else {
    await authStore.register(email.value, password.value)
  }

  if (!authStore.error) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="auth-container">
    <h1>Quotasky</h1>
    <h2>{{ isLogin ? 'Iniciar sesión' : 'Registrarse' }}</h2>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />

      <p v-if="authStore.error" class="error">{{ authStore.error }}</p>

      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Registrarse') }}
      </button>
    </form>

    <p>
      {{ isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
      <span @click="isLogin = !isLogin">
        {{ isLogin ? 'Regístrate' : 'Inicia sesión' }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  background-color: #3ecf8e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.9rem;
}

span {
  color: #3ecf8e;
  cursor: pointer;
  font-weight: bold;
}
</style>