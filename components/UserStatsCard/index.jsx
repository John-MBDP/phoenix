import { Avatar, Typography } from "@material-ui/core";
import styles from "./Index.module.css";

const UserStatCard = ({ children, name, image }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Avatar
          style={{
            height: "130px",
            width: "130px",
            backgroundColor: `${!image ? "#ff8bb2" : "white"}`,
            fontSize: "4rem"
          }}
          src={image}
        >
          {name && !image
            ? name
                .split(" ")
                .map((item) => item[0].toUpperCase())
                .join("")
            : null}
        </Avatar>
      </div>
      <Typography
        className={styles.username}
        align="center"
        variant="h5"
        component="h1"
      >
        {name ? <strong>{name}</strong> : null}
      </Typography>
      {children}
    </div>
  );
};

export default UserStatCard;
