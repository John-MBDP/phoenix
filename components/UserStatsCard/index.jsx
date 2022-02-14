import { Avatar, Typography } from "@material-ui/core";
import styles from "./Index.module.css";

const UserStatCard = ({ children, name }) => {
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
        {name ? <strong>{name}</strong> : null}
        {children}
      </Typography>
      {children}
    </div>
  );
};

export default UserStatCard;
