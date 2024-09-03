import { ThemeOptions, createTheme } from "@mui/material/styles";

const mainColor = "#557C93";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: mainColor,
      contrastText: "#ffffff", // White text on primary color
    },
    secondary: {
      //main: "#ff4081", // A complementary secondary color
      main: "#0a4c8c",
    },
    background: {
      default: "#f5f5f5", // Softer light background
      paper: "#ffffff", // Clean white paper background
    },
    text: {
      primary: "#1c1c1c", // Slightly off-black for a softer contrast
      secondary: "#5f6368", // Muted grey for secondary text
    },
  },
  spacing: 8,
  typography: {
    button: {
      fontFamily: "Inter",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        size: "small", // Set default button size to "small"
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small", // Set default form control size to "small" (if applicable)
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: "small", // Adjust font size for labels
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small", // Adjust font size for inputs
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem", // Adjust font size for helper text
        },
      },
    },
  },

  shape: {
    borderRadius: 4,
  },
});
