import { createContext, useState } from "react";

export const notificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState({
    initialSender: { id: "initial sender", pings: 0 },
  });

  const pings = { total: 0 };

  const addNotification = senderId => {
    console.log(pings.total);
    pings.total += 1;
    setNotifications(prev => {
      if (prev[senderId] && prev[senderId].id === senderId) {
        prev[senderId].pings = pings.total;
        return prev;
      } else {
        return { ...prev, [senderId]: { id: senderId, pings: pings.total } };
      }
    });
  };

  const clearNotifications = senderId => {
    pings.total = 0;
    if (!senderId) {
      setNotifications(prev => {
        for (const key in prev) {
          if (prev[key]) {
            prev[key].pings = pings.total;
          }
        }
        return prev;
      });
    } else {
      setNotifications(prev => ({
        ...prev,
        [senderId]: { id: senderId, pings: pings.total },
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
