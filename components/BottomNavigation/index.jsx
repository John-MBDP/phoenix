import { BottomNavigation, BottomNavigationAction, Link } from "@material-ui/core";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Home.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import { useRouter } from "next/router";

export default function BottomNav() {
  const views = ["", "messages", "search", "profile"];
  const router = useRouter();

  return (
    <div className={styles.bottomNav}>
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => {
          router.push(`/${views[newValue]}`);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: "black" }} />} />
        <BottomNavigationAction label="Messages" icon={<MessageIcon sx={{ color: "black" }} />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon sx={{ color: "black" }} />} />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon sx={{ color: "black" }} />}
        />
      </BottomNavigation>
    </div>
  );
}
