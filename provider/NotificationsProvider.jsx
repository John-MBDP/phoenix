import { createContext, useState } from "react";

export const notificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(0);

  const addNotification = () => {
    setNotifications(prev => prev + 1);
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  const notificationsData = { notifications, addNotification, clearNotifications };

  return (
    <notificationsContext.Provider value={notificationsData}>
      {children}
    </notificationsContext.Provider>
  );
}
