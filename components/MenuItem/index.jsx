import styles from "./index.module.css";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";
import { ListItemButton } from "@mui/material";

const MenuItem = ({ children, heading, path }) => {
  const router = useRouter();

  const handleRedirect = (event, path) => {
    router.push(path);
  };

  return (
    <ListItemButton
      sx={{ width: "100%", borderRadius: "50%" }}
      onClick={(e) => handleRedirect(e, path)}
    >
      <ListItem
        sx={{ pb: 1.8, pt: 2 }}
        divider
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "rgba(0,0,0,0)" }}>
            {children}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={heading} />
      </ListItem>
    </ListItemButton>
  );
};

export default MenuItem;
