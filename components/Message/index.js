import { Avatar } from "@mui/material";
import styles from "./Index.module.css";
import Link from "next/link";

const Message = ({
  children,
  fromClient,
  senderId,
  date,
  profilePic,
  route,
}) => {
  return (
    <>
      <div className={styles.date}>{date}</div>
      <div className={styles.imageCard}>
        {!fromClient && (
          <div style={{ margin: "0 1em 0 0" }}>
            <Link href={`/${route}/${senderId}`}>
              <Avatar
                alt="profile photo"
                src={profilePic || "/images/huTao.png"}
                style={{ width: '55px', height: '55px' }}
              />
            </Link>
          </div>
        )}
        <div
          className={`
            ${fromClient ? styles.client : styles.lawyer}
            ${styles.message}
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Message;
