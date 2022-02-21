import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import TopNavBar from "../components/TopNavBar";
import BottomNav from "../components/BottomNavigation";
import { useState } from "react";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import useUser from "../hooks/useUser";
import NotificationsProvider from "../provider/NotificationsProvider";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false,
  });

  const [navbar, setNavbar] = useState({
    navbar: "",
    hidden: false,
  });

  const { user } = useUser();

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <NotificationsProvider>
        <TopNavBar header={header} user={user} />
        <div className={styles.view}>
          <Component
            {...pageProps}
            setHeader={setHeader}
            setNavbar={setNavbar}
          />
        </div>
        <BottomNav navbar={navbar} />
      </NotificationsProvider>
    </SWRConfig>
  );
}
export default MyApp;
