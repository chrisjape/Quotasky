import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const register = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signUp({ email, password })
      if (err) throw err
      user.value = data.user
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      user.value = data.user
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  return { user, loading, error, register, login, logout, fetchUser }
})