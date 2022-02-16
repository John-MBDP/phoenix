import styles from "./index.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const StyledButton = ({ children, expanded = false, ...restprops }) => {
  return (
    <div className={styles.container}>
      <button
        {...restprops}
        variant="contained"
        size="large"
        className={
          expanded ? `${styles.button} ${styles.expanded}` : styles.button
        }
      >
        {children}
      </button>

      <style jsx>{`
        .innerContainer {
          display: flex;
          justify-content: space-between;
        }
        .message {
          margin-left: 0.3rem;
          display: flex;
          align-items: center;
        }
        .button {
          background-color: "#ff0056";
          color: white;
          border: none;
          margin-bottom: 2rem;
          padding: "1rem 1.5rem";
          border-radius: 0.3rem;
          text-transform: uppercase;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 5px 1rem rgba(0, 0, 0, 0.5);
        }
        .icon {
        }
        .container {
          display: flex;
          position: relative;
          justify-content: "flex-end";
        }
      `}</style>
    </div>
  );
};

export default StyledButton;
