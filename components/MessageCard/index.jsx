import { Typography, Card } from "@mui/material";

const MessageCard = ({ firstName, lastName, recentMessage, dateSent }) => {
  return (
    <Card>
      <Typography gutterBottom variant="h5" component="div">
        {firstName} {lastName}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {recentMessage}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {dateSent}
      </Typography>
    </Card>
  );
};

export default MessageCard;
