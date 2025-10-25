import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  MenuItem,
  Chip,
  Checkbox,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import type { Task } from "../../../types/task";
import { getPriorityColor, getStatusColor } from "./TaskColors";

type Props = {
  task: Task;
  onUpdate: (t: Task) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskRow({ task, onUpdate, onDelete }: Props) {
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [local, setLocal] = React.useState<Task>(task);

  React.useEffect(() => setLocal(task), [task]);

  const startEdit = () => setEditing(true);
  const saveEdit = () => {
    setEditing(false);
    onUpdate(local);
  };
  const change = <K extends keyof Task>(k: K, v: Task[K]) =>
    setLocal((s) => ({ ...s, [k]: v }));

  const handleComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...task,
      status: event.target.checked ? "Completed" : "In Progress",
    });
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor:
            task.status === "Completed" ? "rgba(46, 125, 50, 0.1)" : "inherit",
          transition: "background-color 0.3s ease",
        }}
        
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen((o) => !o)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Checkbox
            checked={task.status === "Completed"}
            onChange={handleComplete}
          />
        </TableCell>

        <TableCell>{task.title}</TableCell>

        <TableCell>
          <Chip
            label={task.priority}
            sx={{ ...getPriorityColor(task.priority), fontWeight: "bold" }}
          />
        </TableCell>

        <TableCell>
          <Chip
            label={task.status}
            sx={{
              backgroundColor: `${getStatusColor(task.status)}20`,
              color: getStatusColor(task.status),
              fontWeight: "bold",
            }}
          />
        </TableCell>

        <TableCell>{task.startDate || "-"}</TableCell>
        <TableCell>{task.endDate || "-"}</TableCell>

        <TableCell>
          <Box display="flex" gap={1}>
            <IconButton onClick={() => (editing ? saveEdit() : startEdit())}>
              {editing ? <SaveIcon color="success" /> : <EditIcon />}
            </IconButton>
            <Tooltip title="Delete task">
              <IconButton onClick={() => onDelete(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow
        sx={{
          "& > *": { borderBottom: "none !important" }, // remove double-line from collapse row too
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {editing ? (
                <Box display="flex" flexDirection="column" gap={1}>
                  <TextField
                    label="Title"
                    value={local.title}
                    onChange={(e) => change("title", e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Subtitle"
                    value={local.subtitle || ""}
                    onChange={(e) =>
                      change("subtitle", e.target.value || undefined)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    value={local.description || ""}
                    onChange={(e) =>
                      change("description", e.target.value || undefined)
                    }
                    multiline
                    minRows={3}
                    fullWidth
                  />
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                      label="Start"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={local.startDate || ""}
                      onChange={(e) =>
                        change("startDate", e.target.value || undefined)
                      }
                    />
                    <TextField
                      label="End"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={local.endDate || ""}
                      onChange={(e) =>
                        change("endDate", e.target.value || undefined)
                      }
                    />
                    <TextField
                      select
                      label="Priority"
                      value={local.priority}
                      onChange={(e) =>
                        change("priority", e.target.value as Task["priority"])
                      }
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label="Status"
                      value={local.status}
                      onChange={(e) =>
                        change("status", e.target.value as Task["status"])
                      }
                    >
                      <MenuItem value="Backlog">Backlog</MenuItem>
                      <MenuItem value="Todo">Todo</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </TextField>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography variant="subtitle1">
                    {task.subtitle || ""}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {task.description || "No description"}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Created: {new Date(task.createdAt).toLocaleString()}
                  </Typography>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
