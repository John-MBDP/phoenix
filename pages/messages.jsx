import { Box, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../components/Message";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const messages = await prisma.messages.findMany({
    where: {
      lawyer_id: {
        equals: 2
      },
      client_id: {
        equals: 4
      }
    }
  });
  return {
    props: {
      data: messages
    }
  };
}

const messages = ({ data }) => {
  const messageArray = data.map((item) => {
    return (
      <Message
        key={item.id}
        fromClient={item.from_client}
        date={item.date_sent}
      >
        {item.body}
      </Message>
    );
  });
  return <div>{messageArray}</div>;
};

export default messages;
