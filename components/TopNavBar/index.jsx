import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { padding } from "@mui/system";
const TopNavBar = ({ header }) => {
  return (
    <div>
      <AppBar
        position={"fixed"}
        sx={{
          backgroundColor: "#1D1F37",
          borderRadius: "0  0 2rem 2rem",
          display: header.hidden ? "none" : "block"
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", padding: "1.5rem 1.5rem" }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
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
    </div>
  );
};

export default TopNavBar;
