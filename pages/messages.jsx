import { Box, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";

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
      <Box
        key={item.id}
        sx={{
          backgroundColor: "red",
          width: "80%"
        }}
      >
        {item.body}
      </Box>
    );
  });
  return <Box>{messageArray}</Box>;
};

export default messages;
