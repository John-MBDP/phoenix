import styles from "./index.module.scss";

const InputError = ({ message }) => {
  return (
    <div className={`${styles.error} ${message && styles.visible}`}>
      {message && <span>{message}</span>}
    </div>
  );
};

export default InputError;
