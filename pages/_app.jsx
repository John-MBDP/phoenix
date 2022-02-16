import "../styles/globals.css";
import TopNavBar from "../components/TopNavBar";
import { useState, useEffect } from "react";
import { BottomNavigationProvider } from "../Contexts/BottomNavigationContext";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../lib/session";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";

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
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !router.pathname === "/login") {
  //     router.push("/login");
  //   }
  // });

  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false
  });

  return (
    <>
      <TopNavBar header={header} />
      <BottomNavigationProvider>
        <Component {...pageProps} setHeader={setHeader} />
      </BottomNavigationProvider>
    </>
  );
}
export default MyApp;
