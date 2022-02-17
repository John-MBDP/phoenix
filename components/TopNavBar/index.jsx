import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState, useRef, useEffect } from "react";
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const TopNavBar = ({ header }) => {
  const drawerHeight = 240;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below drawer header
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * close nav bar if click outside detected
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div style={{ position: "fixed", zIndex: "10" }} ref={wrapperRef}>
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
          <IconButton component="a" href="/profile">
            <Avatar sx={{ marginTop: 2, marginRight: 1 }} />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem button component="a" href="/">
            <ListItemIcon>
              <HomeIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component="a" href="/search">
            <ListItemIcon>
              <SearchIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Find Lawyers" />
          </ListItem>
          <ListItem button component="a" href="/messages">
            <ListItemIcon>
              <MessageIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button component="a" href="/favourites">
            <ListItemIcon>
              <FavoriteIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Favourites" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BusinessCenterIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Services Status" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default TopNavBar;
