import ReactTimeago from "react-timeago";
import styles from "./Index.module.css";

const Button = ({ children, fromClient, date }) => {
  return (
    <div
      className={`
    ${fromClient && styles.client}
    ${styles.message}
  `}
    >
      {children}
    </div>
  );
};

export default Button;
