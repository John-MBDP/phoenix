import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import MessageCard from "../../../components/MessageCard";

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

const timeifyDate = (dateObj) => {
  // turn date into a time - if longer than 24 hours, turn into days
};

const MessagesIndex = ({ initialMessages }) => {
  const [messageCards, setMessageCards] = useState(initialMessages);
  console.log(messageCards);
  const parsedMessageCards = messageCards.map(message => {
    return (
      <MessageCard
        key={message.id}
        firstName={message.lawyers.first_name}
        lastName={message.lawyers.last_name}
        recentMessage={message.body}
        dateSent={message.date_sent.toString()}
      />
    );
  });

  console.log(parsedMessageCards);
  return <section>{parsedMessageCards}</section>;
};

export default MessagesIndex;
