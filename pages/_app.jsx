import BottomNav from "../components/BottomNavigation";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import TopNavBar from "../components/TopNavBar";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNavBar />
      <div className={styles.view}>
        <Component {...pageProps} />
      </div>
      <BottomNav />
    </>
  );
}

export default MyApp;
