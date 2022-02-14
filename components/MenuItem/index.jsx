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
const MenuItem = ({ children, heading }) => {
  const router = useRouter();

  const handleRedirect = (event, page) => {
    console.log(event);
    console.log(page);
    router.push(page);
  };

  return (
    <ListItemButton sx={{ width: "100%", borderRadius: "50%" }}>
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
          <Avatar sx={{ backgroundColor: "white", width: 30, height: 30 }}>
            {children}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={heading} />
      </ListItem>
    </ListItemButton>
  );
};

export default MenuItem;
