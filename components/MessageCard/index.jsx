import { Typography, Card, Avatar } from "@mui/material";
import Link from "next/link";
import styles from "./index.module.scss";

const MessageCard = ({
  route,
  id,
  firstName,
  lastName,
  recentMessage,
  dateSent,
}) => {
  return (
    <Link href={`/messages/${route}/${id}`} passHref>
      <Card className={styles.message_card}>
        <Avatar
          alt="lawyer icon"
          src="/images/justice-gd35301419_1920.jpg"
          sx={{ width: 55, height: 55, mx: 1 }}
          className={styles.avatar}
        />
        <div className={styles.message_card_info}>
          <div className={styles.name_and_body}>
            <Typography
              sx={{ fontWeight: "bold" }}
              gutterBottom
              variant="body1"
              component="div"
            >
              {firstName} {lastName}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {recentMessage}
            </Typography>
          </div>
          <div className={styles.time_and_ping}>
            <Typography
              sx={{ fontWeight: "bold" }}
              gutterBottom
              variant="body2"
              component="div"
            >
              {dateSent}
            </Typography>
            <div className={styles.messages_ping}>1</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MessageCard;
