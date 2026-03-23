import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from './auth'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const loading = ref(false)

  const fetchTasks = async () => {
    const authStore = useAuthStore()
    loading.value = true
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', authStore.user.id)
      .order('created_at', { ascending: false })
    if (!error) tasks.value = data
    loading.value = false
  }

  const addTask = async (title) => {
    const authStore = useAuthStore()
    const { data, error } = await supabase
      .from('tasks')
      .insert({ title, is_completed: false, user_id: authStore.user.id })
      .select()
      .single()
    if (!error) tasks.value.unshift(data)
  }

  const toggleTask = async (task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !task.is_completed })
      .eq('id', task.id)
    if (!error) task.is_completed = !task.is_completed
  }

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    if (!error) tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, loading, fetchTasks, addTask, toggleTask, deleteTask }
})