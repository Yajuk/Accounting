"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

interface pageMenuInterface {
  name: string;
  link: string;
}

interface ResponsiveMenuProps {
  pages: pageMenuInterface[];
}

function ResponsiveMenu({ pages }: ResponsiveMenuProps) {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const theme = useTheme();
  const pathname = usePathname();

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  const isSelected = (link: string) => {
    return link === pathname;
  };

  return (
    <List>
      {pages.map((page, i) => (
        <Link href={page.link} key={page.name}>
          <ListItem dense>
            <ListItemButton
              //onClick={() => handleMenuClick(i)}
              disableRipple
              sx={{
                backgroundColor: isSelected(page.link)
                  ? "primary.light"
                  : "transparent",
                color: isSelected(page.link) ? "white" : "text.primary",
                border: "1px solid #ccc",
                borderRadius: "8px",
                transition: "all 1.3s ease",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default ResponsiveMenu;
