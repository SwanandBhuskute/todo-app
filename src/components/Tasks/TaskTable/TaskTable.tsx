import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { Task } from "../../../types/task";
import TaskRow from "./TaskRow";

type Props = {
  tasks: Task[];
  onUpdate: (t: Task) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskTable({ tasks, onUpdate, onDelete }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No tasks yet
                </TableCell>
              </TableRow>
            ) : (
              tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
}
