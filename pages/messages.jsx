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
  console.log(messages);
  return {
    props: {
      messages: messages
    }
  };
}

const messages = ({ messages }) => {
  const messageArray = messages.map((item) => (
    <div key={item.id} className={item.from_client && "from-client"}>
      {item.body}
    </div>
  ));
  return <div>{messageArray}</div>;
};

export default messages;
