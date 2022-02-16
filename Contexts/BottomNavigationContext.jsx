import { createContext, useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import styles from "../styles/Home.module.css";

export const BottomNavigationContext = createContext({});

export function BottomNavigationProvider({ children }) {
  const [active, setActive] = useState(false);

  return (
    <BottomNavigationContext.Provider value={{ setActive }}>
      <div className={styles.view}>{children}</div>
      {active && <BottomNavigation />}
    </BottomNavigationContext.Provider>
  );
}
