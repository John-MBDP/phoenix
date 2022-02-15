import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import MessageCard from "../../components/MessageCard";
import { Tabs, Tab } from "@material-ui/core";
import timeifyDate from "../../helpers/timeifyDate";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const lawyerMessages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: 4
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
        equals: 1
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
    },
    revalidate: 10
  };
};

const MessagesIndex = ({ lawyerMessages, lawfirmMessages, setHeader }) => {
  const [messageCards, setMessageCards] = useState(lawyerMessages);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setHeader({ header: "MESSAGES", hidden: false, fixed: false });
  }, []);

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
