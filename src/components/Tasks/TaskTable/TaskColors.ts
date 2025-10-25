export const getPriorityColor = (priority: string) => {
  const colors = {
    Low: { backgroundColor: "#e8f5e9", color: "#2e7d32" },
    Medium: { backgroundColor: "#fff3e0", color: "#ef6c00" },
    High: { backgroundColor: "#ffebee", color: "#c40505ff" },
  };
  return colors[priority as keyof typeof colors] || colors.Low;
};

export const getStatusColor = (status: string) => {
  const colors = {
    Backlog: "#ffdcb1ff",
    Todo: "#fb8c00",
    "In Progress": "#1976d2",
    Completed: "#2e7d32",
  };
  return colors[status as keyof typeof colors] || colors.Todo;
};
