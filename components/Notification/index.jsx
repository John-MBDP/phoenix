import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Notification = () => {
  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar
          style={{ backgroundColor: "white" }}
          src="/images/huTao.png"
        ></Avatar>
      </ListItemAvatar>
      <ListItemText primary="Amy Doe" secondary="Great! I love it" />
    </ListItem>
  );
};

export default Notification;
