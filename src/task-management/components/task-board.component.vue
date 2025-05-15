<script>
import TaskColumnComponent from "./task-column.component.vue";
import {TaskBoard} from "../model/task-board.js";
export default {
  name: "task-board.component",
  components: {
    TaskColumnComponent
  },
  data() {
    return {
      taskBoard: TaskBoard.createDefault(),
      newTask: {
        title: '',
        description: '',
        columnId: 1
      },
      taskDialog: false,
      editingTask: null
    }
  },
  methods: {
    openNewTaskDialog() {
      this.newTask = {
        title: '',
        description: '',
        columnId: 1
      };
      this.editingTask = null;
      this.taskDialog = true;
    },

    saveTask() {
      if (!this.newTask.title.trim()) {
        return; // No permitir tareas sin título
      }

      if (this.editingTask) {
        // Actualizar tarea existente
        this.taskBoard.updateTask(
            this.editingTask.id,
            this.newTask.columnId,
            {
              title: this.newTask.title,
              description: this.newTask.description
            }
        );
      } else {
        // Crear nueva tarea
        this.taskBoard.createTask(
            this.newTask.title,
            this.newTask.description,
            this.newTask.columnId
        );
      }

      this.taskDialog = false;
    },

    handleTaskEdit(task, columnId) {
      this.editingTask = task;
      this.newTask = {
        title: task.title,
        description: task.description,
        columnId: columnId
      };
      this.taskDialog = true;
    },

    handleTaskDelete(taskId, columnId) {
      if (confirm(this.$t('tasks.confirmDelete'))) {
        this.taskBoard.deleteTask(taskId, columnId);
      }
    },

    handleTaskDrop({ taskId, sourceColumnId, targetColumnId }) {
      if (sourceColumnId !== targetColumnId) {
        this.taskBoard.moveTask(taskId, sourceColumnId, targetColumnId);
      }
    }
  }
}
</script>

<template>
  <div class="task-board p-4">
    <div class="board-header mb-4">
      <h1 class="text-2xl font-bold">{{ $t('tasks.title') }}</h1>
      <pv-button
          icon="pi pi-plus"
          :label="$t('tasks.addTask')"
          class="p-button-primary"
          @click="openNewTaskDialog"
      />
    </div>

    <div class="board-container">
      <task-column-component
          v-for="column in taskBoard.columns"
          :key="column.id"
          :column="column"
          @task-edit="handleTaskEdit"
          @task-delete="handleTaskDelete"
          @task-drop="handleTaskDrop"
      />
    </div>

    <!-- Diálogo para crear/editar tareas -->
    <pv-dialog
        v-model:visible="taskDialog"
        :header="editingTask ? $t('tasks.edit') : $t('tasks.create')"
        :modal="true"
        :style="{ width: '500px' }"
        class="task-dialog"
    >
      <div class="p-fluid task-dialog-content">
        <div class="field mb-4">
          <label for="task-title" class="block mb-2 font-medium">{{ $t('tasks.taskTitle') }}</label>
          <pv-input-text
              id="task-title"
              v-model="newTask.title"
              autofocus
              :class="{'p-invalid': newTask.title.trim() === ''}"
              class="w-full p-inputtext"
          />
          <small v-if="newTask.title.trim() === ''" class="p-error block mt-1">
            {{ $t('tasks.taskTitle') }} {{ $t('common.required') }}
          </small>
        </div>

        <div class="field mb-4">
          <label for="task-description" class="block mb-2 font-medium">{{ $t('tasks.taskDescription') }}</label>
          <pv-textarea
              id="task-description"
              v-model="newTask.description"
              rows="3"
              class="w-full p-inputtext"
          />
        </div>

        <div class="field mb-4">
          <label for="task-column" class="block mb-2 font-medium">{{ $t('tasks.column') }}</label>
          <pv-dropdown
              id="task-column"
              v-model="newTask.columnId"
              :options="taskBoard.columns"
              option-label="title"
              option-value="id"
              class="w-full p-inputtext"
          />
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <pv-button
              :label="$t('tasks.cancel')"
              icon="pi pi-times"
              class="p-button-text"
              @click="taskDialog = false"
          />
          <pv-button
              :label="$t('tasks.save')"
              icon="pi pi-check"
              class="p-button-primary ml-2"
              :disabled="newTask.title.trim() === ''"
              @click="saveTask"
          />
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
.task-board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
  height: calc(100vh - 160px);
  min-height: 400px;
}

/* Estilos para el diálogo de tareas */
:deep(.task-dialog) {
  padding: 0;
}

:deep(.task-dialog .p-dialog-header) {
  padding: 1.5rem 1.5rem 1rem;
}

:deep(.task-dialog .p-dialog-content) {
  padding: 0 1.5rem 1.5rem;
}

.task-dialog-content {
  padding: 1rem 0;
}

:deep(.p-inputtext) {
  padding: 0.75rem;
}

:deep(.p-dropdown) {
  height: auto;
}

:deep(.p-dropdown-label) {
  padding: 0.75rem;
}

:deep(.task-dialog .p-dialog-footer) {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #e9ecef;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .board-container {
    flex-direction: column;
    height: auto;
  }

  .task-column {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>