import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

const Notification = () => {
  return (
    <ListItem sx={{ p: 0 }}>
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
