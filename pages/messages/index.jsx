import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import MessageCard from "../../components/MessageCard";
import Timeago from "react-timeago";
import { Tabs, Tab } from "@material-ui/core";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const lawyerMessages = await prisma.messages.findMany({
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
  const lawfirmMessages = await prisma.messages.findMany({
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
      lawyerMessages,
      lawfirmMessages,
    },
    revalidate: 10,
  };
};

const timeifyDate = date => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const time = `${(date.getHours() + 24) % 12 || 12}:${date.getMinutes()}`;

  if (date.getTime() < Date.now() - 31536000000) {
    return `${
      months[date.getUTCMonth()]
    } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  } else if (date.getTime() < Date.now() - 604800000) {
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
  } else if (date.getTime() < Date.now() - 86400000) {
    return days[date.getDay()];
  } else if (date.getTime() < Date.now() - 43200000) {
    return <Timeago date={date} />;
  } else {
    return date.getHours() < 12 ? `${time} am` : `${time} pm`;
  }
};

const MessagesIndex = ({ lawyerMessages, lawfirmMessages }) => {
  const [messageCards, setMessageCards] = useState(lawyerMessages);
  const [value, setValue] = useState(0);

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
            self.findIndex(message => message.lawyer_id === value.lawyer_id)
          );
        })
        .map(message => {
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
              />
            );
          }
        })
    );
  };

  return (
    <section>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
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
    </section>
  );
};

export default MessagesIndex;
