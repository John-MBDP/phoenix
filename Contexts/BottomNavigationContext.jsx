import { createContext, useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";

export const BottomNavigationContext = createContext({});

export function BottomNavigationProvider({ children }) {
  const [active, setActive] = useState(false);

  return (
    <BottomNavigationContext.Provider value={{ setActive }}>
      {active && <BottomNavigation />}
      {children}
    </BottomNavigationContext.Provider>
  );
}
