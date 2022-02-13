import { Typography, Card } from "@mui/material";
import Link from "next/link";

const MessageCard = ({ route, id, firstName, lastName, recentMessage, dateSent }) => {
  return (
    <Link href={`articles/${route}/${id}`} passHref>
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
    </Link>
  );
};

export default MessageCard;
