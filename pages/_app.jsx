import BottomNav from "../components/BottomNavigation";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false,
    fixed: false
  });

  return (
    <>
      <TopNavBar header={header} />
      <div className={styles.view}>
        <Component {...pageProps} setHeader={setHeader} />
      </div>
      <BottomNav />
    </>
  );
}

export default MyApp;
