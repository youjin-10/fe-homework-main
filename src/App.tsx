import FleetDashboard from "./components/FleetDashboard";
import { Container, ThemeProvider, createTheme } from "@mui/material";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

const theme = createTheme({
  typography: {
    fontFamily: ["poppins", "Roboto"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        // fixed
        sx={
          {
            // mt: "40px",
            // mb: "73px",
            // ml: "52px",
            // fontFamily: "poppins",
          }
        }
      >
        <FleetDashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
