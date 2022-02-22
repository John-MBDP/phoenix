import { Typography, Card, Avatar } from "@mui/material";
import Link from "next/link";
import styles from "./index.module.scss";
import { useContext } from "react";
import { notificationsContext } from "../../provider/NotificationsProvider";

const MessageCard = ({
  route,
  id,
  firstName,
  lastName,
  recentMessage,
  dateSent,
  profilePic,
}) => {
  const { notifications } = useContext(notificationsContext);
  const pings = notifications[id] ? notifications[id].pings : 0;

  return (
    <Link href={`/messages/${route}/${id}`} passHref>
      <Card className={styles.message_card}>
      <div style={{ margin: "0 0.7em 0 0" }}>
        <Avatar
          alt="profile photo"
          src={profilePic || "/images/huTao.png"}
          className={styles.avatar}
          style={{ width: '55px', height: '55px' }}
        />
        </div>
        <div className={styles.message_card_info}>
          <div className={styles.name_and_body}>
            <Typography
              style={{ fontWeight: "bold" }}
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
              gutterBottom
              variant="body2"
              color="text.secondary"
              component="div"
            >
              {dateSent}
            </Typography>
            {pings > 0 && <div className={styles.messages_ping}>{''}</div>}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MessageCard;
