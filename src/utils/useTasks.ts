import React from "react";
import type { Task } from "../types/task";
import { loadTasks, saveTasks } from "./localStorage";

export function useTasks() {
  const [tasks, setTasks] = React.useState<Task[]>(() => loadTasks());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("recent");

  React.useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = (t: Task) => setTasks((s) => [...s, t]);
  const handleUpdate = (updated: Task) =>
    setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
  const handleDelete = (taskId: number) =>
    setTasks((s) => s.filter((t) => t.id !== taskId));

  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.subtitle?.toLowerCase().includes(q)
      );
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.id - a.id;
        case "startDate":
          return (a.startDate || "").localeCompare(b.startDate || "");
        case "endDate":
          return (a.endDate || "").localeCompare(b.endDate || "");
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [tasks, searchQuery, priorityFilter, sortBy]);

  return {
    tasks: filteredAndSortedTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
  };
}