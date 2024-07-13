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
    success: true;
  }
}

export const customTheme = createTheme({
  typography: {
    fontFamily: ["poppins", "Roboto"].join(","),
  },
  palette: {
    primary: {
      main: "#3961F8",
    },
    secondary: {
      main: "#0091FF",
    },
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
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EFEFEF",
      300: "#E4E4E4",
    },
  },
});
