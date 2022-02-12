import BottomNav from "../components/BottomNavigation";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} className={styles.navPadding} />
      <BottomNav />
    </>
  );
}

export default MyApp;
