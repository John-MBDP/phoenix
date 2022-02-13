import Image from "next/image";
import styles from "./index.module.css";

const RoundedTopContainer = ({ children, image, alt, height }) => {
  return (
    <>
      <div className={styles.image}>
        <Image src={image} alt={alt} width={2400} height={3600} />
      </div>
      <div className={styles.pane}>
        <div className={styles.card} style={{ height: `${height}` }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default RoundedTopContainer;
