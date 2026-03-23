<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'

const tasksStore = useTasksStore()
const nuevaTarea = ref('')
const agregando = ref(false)

const agregarTarea = async () => {
  if (!nuevaTarea.value.trim()) return
  await tasksStore.addTask(nuevaTarea.value.trim())
  nuevaTarea.value = ''
  agregando.value = false
}

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>

<template>
  <div class="tasks">
    <h3>📋 Tareas</h3>

    <div v-if="tasksStore.loading" style="font-size: 13px; opacity: 0.6;">
      Cargando...
    </div>

    <div
      v-for="task in tasksStore.tasks"
      :key="task.id"
      class="task"
    >
      <input
        type="checkbox"
        :checked="task.is_completed"
        @change="tasksStore.toggleTask(task)"
      />
      <span :class="{ completada: task.is_completed }">{{ task.title }}</span>
      <button class="delete-btn" @click="tasksStore.deleteTask(task.id)">✕</button>
    </div>

    <div v-if="agregando" class="input-tarea">
      <input
        v-model="nuevaTarea"
        placeholder="Nueva tarea..."
        @keyup.enter="agregarTarea"
        autofocus
      />
      <button @click="agregarTarea">✓</button>
      <button @click="agregando = false">✕</button>
    </div>

    <div v-else class="add-task" @click="agregando = true">
      + Añadir tarea
    </div>
  </div>
</template>

<style scoped>
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
  gap: 8px;
}

.task span {
  flex: 1;
}

.completada {
  text-decoration: line-through;
  opacity: 0.5;
}

.delete-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  font-size: 12px;
  padding: 2px 4px;
}

.delete-btn:hover {
  color: #ff6b6b;
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

.input-tarea {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.input-tarea input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: white;
  font-size: 13px;
}

.input-tarea input::placeholder {
  color: rgba(255,255,255,0.4);
}

.input-tarea button {
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.input-tarea button:hover {
  background: #a1d69d;
}
</style>