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

const MenuItem = ({ children, heading }) => {
  return (
    <div>
      <List className={styles.list}>
        <ListItem
          sx={{ pb: 1.8, pt: 0 }}
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
      </List>
    </div>
  );
};

export default MenuItem;
