import BottomNav from "../components/BottomNavigation";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className={styles.view}>
        <Component {...pageProps} />
      </div>
      <BottomNav />
    </>
  );
}

export default MyApp;
