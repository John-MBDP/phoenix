import { Avatar } from "@mui/material";
import ReactTimeago from "react-timeago";
import styles from "./Index.module.css";

const Message = ({ children, fromClient, date }) => {
  return (
    <>
    <div className={styles.date}>{date}</div>
      <div className={styles.imageCard}>
        {!fromClient && (
          <Avatar
            alt="lawyer icon"
            src="/images/justice-gd35301419_1920.jpg"
            sx={{ width: 55, height: 55, mx: 1 }}
          />
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
