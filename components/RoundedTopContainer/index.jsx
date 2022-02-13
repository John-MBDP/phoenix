import Image from "next/image";
import styles from "./index.module.css";

const RoundedTopContainer = ({ children }) => {
  return (
    <RoundedTopContainer.imagePane
      image={"/images/articles/lib2.jpeg"}
      alt={"books"}
    >
      <div className={styles.roundedTop}>
        {children}
        <h1>Potato</h1>
        <h1>Potato</h1>
        <h1>Potato</h1>
      </div>
    </RoundedTopContainer.imagePane>
  );
};

RoundedTopContainer.imagePane = function ({ children, image, alt }) {
  return (
    <div className={styles.pane}>
      <Image
        className={styles.image}
        src={image}
        alt={alt}
        layout="fill"
        objectFit="cover"
      ></Image>
      {children}
    </div>
  );
};
export default RoundedTopContainer;
