import { Typography } from "@material-ui/core";
import Image from "next/image";
import styles from "./index.module.css";

const RoundedTopContainer = ({ children, image, alt, height, header }) => {
  return (
    <>
      <div className={styles.image}>
        <Image src={image} alt={alt} width={2400} height={3600} />
      </div>
      <div className={styles.pane}>
        <div
          className={styles.card}
          style={{ height: height ? `${height}` : null }}
        >
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
