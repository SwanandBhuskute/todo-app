import React from "react";
import { Box, Button, TextField, MenuItem, Paper } from "@mui/material";
import type { Task } from "../../types/task";

type Props = {
  onAdd: (t: Task) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [form, setForm] = React.useState({
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    status: "Todo",
  });

  const change = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = () => {
    if (!form.title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || undefined,
      description: form.description.trim() || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      priority: form.priority as Task["priority"],
      status: form.status as Task["status"],
      createdAt: new Date().toISOString(),
    };
    onAdd(newTask);
    setForm({
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "Medium",
      status: "Todo",
    });
  };

  return (
    <Paper sx={{ p: 1, mb: 2 }}>
      <Box display="flex" flexWrap="nowrap" gap={2}>
        <TextField
          size="small"
          label="Title"
          value={form.title}
          onChange={(e) => change("title", e.target.value)}
        />
        <TextField
          size="small"
          label="Subtitle"
          value={form.subtitle}
          onChange={(e) => change("subtitle", e.target.value)}
        />
        <TextField
          size="small"
          label="Start date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.startDate}
          onChange={(e) => change("startDate", e.target.value)}
        />
        <TextField
          size="small"
          label="End date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.endDate}
          onChange={(e) => change("endDate", e.target.value)}
        />
        <TextField
          size="small"
          select
          label="Priority"
          value={form.priority}
          onChange={(e) => change("priority", e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          size="small"
          select
          label="Status"
          value={form.status}
          onChange={(e) => change("status", e.target.value)}
        >
          <MenuItem value="Backlog">Backlog</MenuItem>
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button size="large" variant="outlined" onClick={submit}>
          Add
        </Button>
      </Box>
    </Paper>
  );
}
