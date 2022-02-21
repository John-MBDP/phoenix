import { createContext, useState } from "react";

export const notificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState({
    initialSender: { id: "initial sender", pings: 0 },
  });

  const addNotification = senderId => {
    setNotifications(prev => {
      if (prev[senderId] && prev[senderId].id === senderId) {
        prev[senderId].pings += 1;
        return prev;
      } else {
        return { ...notifications, [senderId]: { id: senderId, pings: 0 } };
      }
    });
  };

  const clearNotifications = senderId => {
    if (!senderId) {
      setNotifications(prev => {
        for (const key in prev) {
          if (prev[key]) {
            prev[key].pings = 0;
          }
        }
        return prev;
      });
    } else {
      setNotifications(prev => ({
        ...prev,
        [senderId]: { id: senderId, pings: 0 },
      }));
    }
  };

  const notificationsData = {
    notifications,
    addNotification,
    clearNotifications,
  };

  return (
    <notificationsContext.Provider value={notificationsData}>
      {children}
    </notificationsContext.Provider>
  );
}
