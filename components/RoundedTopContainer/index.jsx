import styles from "./index.module.css";

const RoundedTopContainer = ({ children }) => {
  return (
    <RoundedTopContainer.pane>
      <div className={styles.roundedTop}>
        {children}
        <h1>Potato</h1>
        <h1>Potato</h1>
        <h1>Potato</h1>
      </div>
    </RoundedTopContainer.pane>
  );
};

RoundedTopContainer.pane = function ({ children }) {
  return <div className={styles.pane}>{children}</div>;
};
export default RoundedTopContainer;
