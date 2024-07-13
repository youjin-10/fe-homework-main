import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    notice: Palette["primary"];
  }

  interface PaletteOptions {
    notice?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    notice: true;
  }
}

export const customTheme = createTheme({
  typography: {
    fontFamily: ["poppins", "Roboto"].join(","),
  },
  palette: {
    success: {
      main: "#00D15E",
    },
    notice: {
      main: "#F7B500",
    },
    warning: {
      main: "#FF8138",
    },
    error: {
      main: "#FF3B30",
    },
  },
});
