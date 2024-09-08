"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface pageMenuInterface {
  name: string;
  link: string;
}

interface ResponsiveAppBarProps {
  pages: pageMenuInterface[];
}
function ResponsiveAppBar({ pages }: ResponsiveAppBarProps) {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const theme = useTheme();
  {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, i) => (
                <Link href={page.link} key={page.name}>
                  <Button
                    className="ms-4"
                    onClick={() => setSelectedMenu(i)}
                    size="small"
                    variant="text"
                    ///color={selectedMenu === i ? "inherit" : "secondary"}
                    sx={{
                      // conditional styling
                      color: selectedMenu === i ? "white" : "text.primary",
                      fontWeight: selectedMenu === i ? 600 : 500,
                      backgroundColor:
                        selectedMenu === i ? "primary.dark" : "transparent",

                      padding: "5px 16px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",

                      "&.Mui-selected": {
                        boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
                        border: `2px solid ${theme.palette.primary.dark}`, // Add border for selected menu
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
