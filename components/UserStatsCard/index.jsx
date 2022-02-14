import { Avatar, Typography } from "@material-ui/core";
import styles from "./Index.module.css";

const UserStatCard = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Avatar
          alt="Remy Sharp"
          src="/images/hutao.png"
          style={{ height: "130px", width: "130px" }}
        />
      </div>
      <Typography
        className={styles.username}
        align="center"
        variant="h5"
        component="h1"
      >
        <strong>Amy Doe</strong>
      </Typography>
      {children}
    </div>
  );
};

export default UserStatCard;
