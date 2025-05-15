// src/task-management/model/TaskBoard.js
import { TaskColumn } from './task-column.js';
import { Task } from './Task.js';

/**
 * Clase que representa el tablero completo de tareas
 */
export class TaskBoard {
    constructor(columns = []) {
        this.columns = columns;
        this.currentTaskId = 1;
    }

    static createDefault() {
        const board = new TaskBoard([
            TaskColumn.create(1, 'Tasks'),
            TaskColumn.create(2, 'To-Do'),
            TaskColumn.create(3, 'In progress'),
            TaskColumn.create(4, 'Completed'),
        ]);

        return board;
    }

    createTask(title, description, columnId) {
        const column = this.findColumn(columnId);
        if (!column) return null;

        const task = Task.create(this.currentTaskId++, title, description);
        column.addTask(task);
        return task;
    }

    moveTask(taskId, sourceColumnId, targetColumnId) {
        const sourceColumn = this.findColumn(sourceColumnId);
        const targetColumn = this.findColumn(targetColumnId);

        if (!sourceColumn || !targetColumn) return false;

        const task = sourceColumn.removeTask(taskId);
        if (task) {
            targetColumn.addTask(task);
            return true;
        }

        return false;
    }

    updateTask(taskId, columnId, data) {
        const column = this.findColumn(columnId);
        if (!column) return null;

        return column.updateTask(taskId, data);
    }

    deleteTask(taskId, columnId) {
        const column = this.findColumn(columnId);
        if (!column) return false;

        return column.removeTask(taskId) !== null;
    }

    findColumn(columnId) {
        return this.columns.find(column => column.id === columnId);
    }

    findTaskInAnyColumn(taskId) {
        for (const column of this.columns) {
            const task = column.findTask(taskId);
            if (task) {
                return { task, columnId: column.id };
            }
        }
        return null;
    }
}