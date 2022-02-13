import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import MessageCard from "../../../components/MessageCard";
import Timeago from "react-timeago";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const messages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: 1,
      },
      lawyer_id: {
        equals: null,
      },
    },
    include: {
      lawfirms: true,
    },
    orderBy: [
      {
        date_sent: "desc",
      },
    ],
  });
  return {
    props: {
      initialMessages: messages,
    },
    revalidate: 10,
  };
};

const timeifyDate = dateObj => {
  return dateObj.getTime() < Date.now() - 86400000 ? (
    <Timeago date={dateObj} />
  ) : (
    `${(dateObj.getHours() + 24) % 12 || 12}:${dateObj.getMinutes()}`
  );
};

const MessagesIndex = ({ initialMessages }) => {
  const [messageCards, setMessageCards] = useState(initialMessages);
  const parsedMessageCards = messageCards
    // to just grab the first most recent message
    .filter((value, index, self) => {
      return (
        index ===
        self.findIndex(message => message.law_firm_id === value.law_firm_id)
      );
    })
    .map(message => {
      if (message.from_client && !message.body.includes("You: "))
        message.body = `You: ${message.body}`;
      return (
        <MessageCard
          key={message.id}
          route="law_firms"
          id={message.law_firm_id}
          firstName={message.lawfirms.name}
          lastName=""
          recentMessage={message.body}
          dateSent={timeifyDate(message.date_sent)}
        />
      );
    });

  return <section>{parsedMessageCards}</section>;
};

export default MessagesIndex;
