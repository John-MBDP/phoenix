import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState, useRef, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
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
import styles from "./index.module.scss";
import Link from "next/link";
import { notificationsContext } from "../../provider/NotificationsProvider";
import io from "socket.io-client";
let socket;

const TopNavBar = ({ header, lawyerMessages, lawfirmMessages }) => {
  const [open, setOpen] = useState(false);
  const { notifications, addNotification } = useContext(notificationsContext);
  const [messages, setMessages] = useState([]);
  const drawerHeight = 240;
  const allNotifications = notifications => {
    let total = 0;
    for (const key in notifications) {
      total += notifications[key].pings;
    }
    return total;
  };

  const grabAllMessages = async () => {
    const response = await fetch("/api/messages", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-typing-status", bool => {
      // do something with message card
    });

    socket.on("update-client-messages", newMessage => {
      if (newMessage.lawyer_id) {
        addNotification(newMessage.lawyer_id);
      } else if (newMessage.law_firm_id) {
        addNotification(newMessage.law_firm_id);
      }
    });
  };

  useEffect(async () => {
    socketInitializer();
    try {
      const allMessages = await grabAllMessages();
      setMessages(prev => [...prev, allMessages]);
      allMessages.forEach(message => {
        if (message.seen_client === false) {
          if (message.lawyer_id) {
            addNotification(message.lawyer_id);
          } else if (message.law_firm_id) {
            addNotification(message.law_firm_id);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
    const closeSocket = () => {
      socket.disconnect();
      console.log("Socket closed");
    };
    return closeSocket;
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const wrapperRef = useRef(null);
  useOutsideNavCloser(wrapperRef);

  function useOutsideNavCloser(ref) {
    useEffect(() => {
      // close nav bar if click outside detected
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
          <h1 className={styles.header_title}>{header.header}</h1>
          <div style={{ width: "25px" }}></div>
          <Link href="/messages">
            <div style={{ display: "flex", position: "fixed", right: "5%" }}>
              {allNotifications(notifications) > 0 && (
                <div className={styles.messages_ping}>{""}</div>
              )}
              <NotificationImportantIcon />
            </div>
          </Link>
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
        <header className={styles.nav_header}>
          <IconButton
            component="a"
            href="/profile"
            onClick={() => setOpen(false)}
          >
            <Avatar
              sx={{ marginTop: 2, marginLeft: 2 }}
              style={{ backgroundColor: "#ff8bb2" }}
            />
          </IconButton>
          <span className={styles.profile}>Profile</span>
          <a className={styles.logout} href="/logout">
            Logout
          </a>
        </header>
        <List>
          <ListItem
            button
            component="a"
            href="/"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <HomeIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/search"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <SearchIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Find Lawyers" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/messages"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <MessageIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/favourites"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <FavoriteIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Favourites"
              component="a"
              href="/favourites"
              onClick={() => setOpen(false)}
            />
          </ListItem>
          <ListItem
            button
            component="a"
            href="/service-status"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <BusinessCenterIcon
                sx={{ marginLeft: 3, marginRight: 2, color: "white" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Services Status"
              component="a"
              href="/service-status"
              onClick={() => setOpen(false)}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default TopNavBar;
