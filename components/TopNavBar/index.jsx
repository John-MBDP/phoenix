import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const TopNavBar = ({ header }) => {
  const drawerHeight = 240;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below drawer header
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "fixed", zIndex: "10" }}>
      <AppBar
        sx={{
          backgroundColor: "#1D1F37",
          borderRadius: "0  0 2rem 2rem",
          display: header.hidden ? "none" : "block",
          marginTop: open && `${drawerHeight}px`,
          width: "100%",
        }}
        open={open}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", padding: "1.5rem 1.5rem" }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            {!open && <MenuIcon />}
            {open && <ArrowUpwardIcon />}
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexgrow: 1, fontWeight: "bold" }}
          >
            {header.header}
          </Typography>
          <NotificationImportantIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          height: drawerHeight,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: drawerHeight,
            boxSizing: "border-box",
            backgroundColor: "#1D1F37",
            color: "white",
          },
        }}
        variant="persistent"
        transitionDuration={0}
        anchor="top"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default TopNavBar;
