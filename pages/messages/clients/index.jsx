import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import MessageCard from "../../../components/MessageCard";
import { Tabs, Tab } from "@material-ui/core";
import timeifyDate from "../../../helpers/timeifyDate";
import sessionOptions from "../../../lib/session";
import { withIronSessionSsr } from "iron-session/next";

const prisma = new PrismaClient();

// COOKIE GRAB EXAMPLE
export const getServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const user = req.session.user;
    const clientMessages = await prisma.messages.findMany({
      where: {
        lawyer_id: {
          equals: user.lawyer_id,
        },
      },
      include: {
        clients: true,
      },
      orderBy: [
        {
          date_sent: "desc",
        },
      ],
    });
    return {
      props: {
        clientMessages,
      },
    };
  },
  sessionOptions
);

const MessagesIndex = ({
  clientMessages,
  setHeader,
  setNavbar,
}) => {
  const [messageCards, setMessageCards] = useState(clientMessages);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setHeader({ header: "MESSAGES", hidden: false });
    setNavbar({ navbar: "", hidden: false });
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const parseMessageCards = messageCards => {
    return (
      messageCards
        // to just grab the first most recent message
        .filter((value, index, self) => {
          return (
            index ===
            self.findIndex(message => message.client_id === value.client_id)
          );
        })
        .map(message => {
          if (!message.from_client && !message.body.includes("You: "))
            message.body = `You: ${message.body}`;
          return (
            <MessageCard
              key={message.id}
              route="lawyers"
              id={message.client_id}
              firstName={message.clients.first_name}
              lastName={message.clients.last_name}
              recentMessage={message.body}
              dateSent={timeifyDate(message.date_sent)}
            />
          );
        })
    );
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <Tab label="Clients" onClick={() => setMessageCards(clientMessages)} />
      </Tabs>
      {parseMessageCards(messageCards)}
    </div>
  );
};

export default MessagesIndex;
