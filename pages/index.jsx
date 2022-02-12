import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Home() {
  return (
    <div>
      <img className={styles.img} src="/intersection.png" />
      <div className={styles.container}>
        <h4>THE BEST MOBILE APP FOR LAWYERS</h4>
        <h2>Find your Lawyer</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut blanditiis, autem iusto iste
          eum ut cupiditate illum cumque ab voluptate?
        </p>
      </div>
      <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
        GET STARTED
      </Button>
      <p>Have an account? LOG IN</p>
    </div>
  );
}
