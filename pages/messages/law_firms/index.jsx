import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStaticProps = async () => {
  const messages = await prisma.messages.findMany({
    where: {
      client_id: {
        equals: 4,
      },
      lawyer_id: {
        equals: null,
      },
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
  };
};

const MessagesIndex = initialMessages => {
  console.log(initialMessages);
  return <section>All Messages</section>;
};

export default MessagesIndex;
