import styles from "./index.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const StyledButton = ({
  children,
  expanded = false,
  back = false,
  background,
  hidden,
  ...restprops
}) => {
  return (
    <div className={styles.container}>
      <button
        {...restprops}
        variant="contained"
        size="large"
        style={{ backgroundColor: background ? `${background}` : null }}
        className={`${expanded ? `${styles.button} ${styles.expanded}` : styles.button}
        ${back ? `${styles.back}` : styles.button}
        ${hidden ? `${styles.hidden}` : null}
  `}
      >
        {children}
      </button>
    </div>
  );
};

export default StyledButton;
