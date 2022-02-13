import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import MessageCard from "../../../components/MessageCard";
import Timeago from "react-timeago";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const messages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: 4,
      },
      law_firm_id: {
        equals: null,
      },
    },
    include: {
      lawyers: true,
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
        self.findIndex(message => message.lawyer_id === value.lawyer_id)
      );
    })
    .map(message => {
      return (
        <MessageCard
          key={message.id}
          route="lawyers"
          id={message.lawyer_id}
          firstName={message.lawyers.first_name}
          lastName={message.lawyers.last_name}
          recentMessage={message.body}
          dateSent={timeifyDate(message.date_sent)}
        />
      );
    });

  return <section>{parsedMessageCards}</section>;
};

export default MessagesIndex;
