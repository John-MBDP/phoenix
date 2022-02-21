import { prisma } from "../../lib/prisma";
import { useState, useEffect, useContext } from "react";
import MessageCard from "../../components/MessageCard";
import { Tabs, Tab } from "@material-ui/core";
import timeifyDate from "../../helpers/timeifyDate";
import sessionOptions from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { notificationsContext } from "../../provider/NotificationsProvider";
import Typography from "@mui/material/Typography";
import io from "socket.io-client";
import Alert from "../../components/Alert";
let socket;

// COOKIE GRAB EXAMPLE
export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  const lawyerMessages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: user.id
      },
      law_firm_id: {
        equals: null
      }
    },
    include: {
      lawyers: true
    },
    orderBy: [
      {
        date_sent: "desc"
      }
    ]
  });
  const lawfirmMessages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: user.id
      },
      lawyer_id: {
        equals: null
      }
    },
    include: {
      lawfirms: true
    },
    orderBy: [
      {
        date_sent: "desc"
      }
    ]
  });
  return {
    props: {
      lawyerMessages,
      lawfirmMessages
    }
  };
}, sessionOptions);

const MessagesIndex = ({
  lawyerMessages,
  lawfirmMessages,
  setHeader,
  setNavbar
}) => {
  const [messageCards, setMessageCards] = useState(lawyerMessages);
  const [value, setValue] = useState(0);
  const { notifications, addNotification, clearNotifications } =
    useContext(notificationsContext);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-typing-status", (bool) => {
      // do something with message card
    });

    socket.on("update-client-messages", (newMessage) => {
      if (newMessage.lawyer_id) {
        addNotification(newMessage.lawyer_id);
      } else if (newMessage.law_firm_id) {
        addNotification(newMessage.law_firm_id);
      }
      setMessageCards((prev) => [...prev, newMessage]);
    });
  };

  useEffect(() => {
    setHeader({ header: "MESSAGES", hidden: false });
    setNavbar({ navbar: "", hidden: false });
    socketInitializer();
    messageCards.forEach((message) => {
      if (message.seen_client === false) {
        if (message.lawyer_id) {
          addNotification(message.lawyer_id);
        } else if (message.law_firm_id) {
          addNotification(message.law_firm_id);
        }
      }
    });
    const closeSocket = () => {
      socket.disconnect();
      console.log("Socket closed");
    };
    return () => {
      closeSocket();
      clearNotifications();
    };
  }, [messageCards]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const parseMessageCards = (messageCards) => {
    return (
      messageCards
        // to just grab the first most recent message
        .filter((value, index, self) => {
          return (
            index ===
            self.findIndex((message) => message.lawyer_id === value.lawyer_id)
          );
        })
        .map((message) => {
          if (message.from_client && !message.body.includes("You: "))
            message.body = `You: ${message.body}`;
          if (message.lawyers) {
            return (
              <MessageCard
                key={message.id}
                route="lawyers"
                id={message.lawyer_id}
                firstName={message.lawyers.first_name}
                lastName={message.lawyers.last_name}
                recentMessage={message.body}
                dateSent={timeifyDate(message.date_sent)}
                profilePic={message.lawyers.profile_pic}
              />
            );
          } else if (message.lawfirms) {
            return (
              <MessageCard
                key={message.id}
                route="law_firms"
                id={message.law_firm_id}
                firstName={message.lawfirms.name}
                lastName=""
                recentMessage={message.body}
                dateSent={timeifyDate(message.date_sent)}
                profilePic={message.lawfirms.profile_pic}
              />
            );
          }
        })
    );
  };

  return (
    <div style={{ marginTop: "5.5em" }}>
      <Tabs
        value={value}
        textColor="secondary"
        onChange={handleChange}
        style={{ marginLeft: '1em', marginBottom: '0.7em' }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <Tab label="Lawyers" onClick={() => setMessageCards(lawyerMessages)} />
        <Tab
          label="Lawfirms"
          onClick={() => {
            setMessageCards(lawfirmMessages);
          }}
        />
      </Tabs>
      {parseMessageCards(messageCards)}
      <div style={{ margin: "0 2rem" }}>
        {messageCards.length === 0 && (
          <Alert message="Nothing to see here. You have no messages yet!" />
        )}
      </div>
    </div>
  );
};

export default MessagesIndex;
