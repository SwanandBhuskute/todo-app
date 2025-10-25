import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
};

export default function FiltersBar({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
}: Props) {
  const controlStyle = {
    minWidth: 120,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 1,
    "& .MuiInputLabel-root": { color: "#2c3e50" },
    "& .MuiOutlinedInput-root": {
      color: "#2c3e50",
      "& fieldset": { borderColor: "rgba(44,62,80,0.2)" },
      "&:hover fieldset": { borderColor: "#201f1eff" },
      "&.Mui-focused fieldset": { borderColor: "#201f1eff" },
    },
  };

  return (
    <Box sx={{ width: "100%", mb: 2, display: "flex", gap: 2 }}>
      <TextField
        size="small"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          flex: 1,
          maxWidth: 300,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 1,
          "& .MuiInputBase-input": {
            color: "#2c3e50", // text color
            "::placeholder": {
              color: "rgba(44, 62, 80, 0.6)", // visible placeholder
              opacity: 1,
            },
          },
          "& .MuiOutlinedInput-root fieldset": {
            borderColor: "rgba(44,62,80,0.2)",
          },
          "& .MuiOutlinedInput-root:hover fieldset": {
            borderColor: "#201f1eff",
          },
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "#201f1eff",
          },
        }}
      />

      <FormControl size="small" sx={controlStyle}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priorityFilter}
          label="Priority"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={controlStyle}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="recent">Recently Added</MenuItem>
          <MenuItem value="startDate">Start Date</MenuItem>
          <MenuItem value="endDate">End Date</MenuItem>
          <MenuItem value="az">A → Z</MenuItem>
          <MenuItem value="za">Z → A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
