import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";

const TopNavBar = ({ header }) => {
  const drawerHeight = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: "100%",
      marginTop: `${drawerHeight}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
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
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
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
        anchor="top"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
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
