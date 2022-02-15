import { Typography } from "@material-ui/core";
import Image from "next/image";
import styles from "./index.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const RoundedTopContainer = ({ children, image, alt, height }) => {
  return (
    <>
      <Card className={styles.image}>
        <CardMedia component="img" width="390" image={image} alt={alt} />
      </Card>
      <div className={styles.pane}>
        <div className={styles.card} style={{ height: height ? `${height}` : null }}>
          <div className={styles.scrollSnap}> {children}</div>
        </div>
      </div>
    </>
  );
};

RoundedTopContainer.Header = ({ text }) => {
  return (
    <div style={{ paddingTop: "16px" }}>
      <Typography component="h1" variant="h6">
        {text}
      </Typography>
    </div>
  );
};

export default RoundedTopContainer;
