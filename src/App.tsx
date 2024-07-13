import FleetDashboard from "./components/FleetDashboard";
import { Container, ThemeProvider } from "@mui/material";
import { customTheme } from "./customTheme";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
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
