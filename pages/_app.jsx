import BottomNav from "../components/BottomNavigation";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import { BottomNavigationProvider } from "../Contexts/BottomNavigationContext";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false,
  });

  return (
    <>
      <TopNavBar header={header} />
      <div className={styles.view}>
        <BottomNavigationProvider>
          <Component {...pageProps} setHeader={setHeader} />
        </BottomNavigationProvider>
      </div>
    </>
  );
}

export default MyApp;
