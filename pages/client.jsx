import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
const client = () => {
  return (
    <div>
      <div>
        <img className={styles.img} src="/book.png" />
        <h2>I AM SIGNING UP AS A</h2>
      </div>
      <div className={styles.container}>
        <Button variant="contained">LAWYER</Button>
        <Button variant="contained">CLIENT</Button>
        <Button variant="contained">LAWFIRM</Button>
      </div>
    </div>
  );
};

export default client;
