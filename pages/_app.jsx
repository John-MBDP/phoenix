import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import TopNavBar from "../components/TopNavBar";
import BottomNav from "../components/BottomNavigation";
import { useState, useEffect } from "react";
// import { BottomNavigationProvider } from "../Contexts/BottomNavigationContext";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";
// import { useRouter } from "next/router";
// import useUser from "../hooks/useUser";

export const getInitalProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  return {
    props: {
      user,
    },
  };
}, sessionOptions);

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps, user }) {
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user && !router.pathname === "/login") {
  //     router.push("/login");
  //   }
  // });

  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false,
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
