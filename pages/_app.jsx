import "../styles/globals.css";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import { BottomNavigationProvider } from "../Contexts/BottomNavigationContext";

// eslint-disable-next-line func-style
function MyApp({ Component, pageProps }) {
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
