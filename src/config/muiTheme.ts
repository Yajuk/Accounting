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
      defaultProps: {
        size: "small", // Adjust font size for helper text
      },
    },
  },

  shape: {
    borderRadius: 4,
  },
});
