import "../styles/globals.css";
import TopNavBar from "../components/TopNavBar";
import { useState, useEffect } from "react";
import { BottomNavigationProvider } from "../Contexts/BottomNavigationContext";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import useUser from "../hooks/useUser";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {

  const [header, setHeader] = useState({
    header: "NEWS FEED",
    hidden: false
  });

  const { user } = useUser();
  console.log(user);

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <TopNavBar header={header} />
      <BottomNavigationProvider>
        <Component {...pageProps} setHeader={setHeader} />
      </BottomNavigationProvider>
    </SWRConfig>
  );
}
export default MyApp;
