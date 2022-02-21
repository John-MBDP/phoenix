import { createContext, useState } from "react";

export const notificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState({
    initialSender: { id: "initial sender", pings: 0 },
  });

  let pings = 0;

  const addNotification = senderId => {
    pings += 1;
    setNotifications(prev => {
      if (prev[senderId] && prev[senderId].id === senderId) {
        prev[senderId].pings = pings;
        return prev;
      } else {
        return { ...prev, [senderId]: { id: senderId, pings: pings } };
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
