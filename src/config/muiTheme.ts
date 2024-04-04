import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#006064",
    },
    secondary: {
      main: "#4db6ac",
    },
    divider: "rgba(185,13,13,0.12)",
  },
  spacing: 8,
  typography: {
    button: {
      fontFamily: "Inter",
      fontSize: "1.2rem",
    },
  },
  shape: {
    borderRadius: 4,
  },
});
