import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Home from "./pages/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}
