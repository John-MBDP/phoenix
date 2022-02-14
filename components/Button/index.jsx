import Button from "@mui/material/Button";
import styles from "./index.module.css";

const StyledButton = ({ children, ...restprops }) => {
  return (
    <div className={styles.container}>
      <button
        {...restprops}
        variant="contained"
        size="large"
        className={styles.button}
      >
        {children}
      </button>
    </div>
  );
};

export default StyledButton;
