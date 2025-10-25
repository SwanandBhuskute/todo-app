import type { Task } from "../types/task";

const STORAGE_KEY = "swan-tasks";

export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch (e) {
    console.error("Failed to parse tasks from localStorage", e);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to localStorage", e);
  }
};
