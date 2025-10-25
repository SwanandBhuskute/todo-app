import { Paper, TableContainer, Typography, Box } from "@mui/material";
import { useTasks } from "../utils/useTasks";
import FiltersBar from "../components/Home/FiltersBar";
import TaskSection from "../components/Home/TaskSection";

export default function Home() {
  const {
    tasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
  } = useTasks();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        p: 2,
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          p: 4,
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 2,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            marginBottom: 3,
            color: "#2c3e50",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Task Manager
        </Typography>

        <FiltersBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <TaskSection
          tasks={tasks}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </TableContainer>
    </Box>
  );
}
