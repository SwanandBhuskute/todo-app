import { Box } from "@mui/material";
import TaskForm from "../Tasks/TaskForm";
import TaskTable from "../Tasks/TaskTable/TaskTable";
import type { Task } from "../../types/task";

type Props = {
  tasks: Task[];
  onAdd: (t: Task) => void;
  onUpdate: (t: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskSection({ tasks, onAdd, onUpdate, onDelete }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <TaskForm onAdd={onAdd} />
      <TaskTable tasks={tasks} onUpdate={onUpdate} onDelete={onDelete} />
    </Box>
  );
}
