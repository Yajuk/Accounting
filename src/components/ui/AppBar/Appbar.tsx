"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

interface pageMenuInterface {
  name: string;
  link: string;
}

interface ResponsiveAppBarProps {
  pages: pageMenuInterface[];
}
function ResponsiveAppBar({ pages }: ResponsiveAppBarProps) {
  {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link href={page.link} key={page.name}>
                  <Button
                    className="ms-4"
                    size="small"
                    variant="text"
                    color="inherit"
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
