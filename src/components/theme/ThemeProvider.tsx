"use client";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "@/config/muiTheme";

export default function ThemeProviderWrapper(props: any) {
  return <ThemeProvider theme={themeOptions}>{props.children}</ThemeProvider>;
}
