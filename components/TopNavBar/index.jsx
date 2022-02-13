import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
const TopNavBar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1D1F37", borderRadius: "0  0 2rem 2rem" }}>
        <Toolbar sx={{ justifyContent: "space-between", padding: "1.5rem 1.5rem" }}>
          <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexgrow: 1, fontWeight: "bold" }}>
            NEWS FEED
          </Typography>
          <NotificationImportantIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavBar;
