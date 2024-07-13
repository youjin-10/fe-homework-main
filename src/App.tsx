import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

function App() {
  return (
    <main className="App">
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100px", width: "800px" }} />
      </Container>
    </main>
  );
}

export default App;
