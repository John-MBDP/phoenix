import { Box, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const messages = await prisma.messages.findMany({
    where: {
      lawyer_id: {
        equals: 2,
      },
      client_id: {
        equals: 4,
      },
    },
    orderBy: [
      {
        date_sent: "asc",
      },
    ],
  });
  return {
    props: {
      initialMessages: messages,
    },
  };
}

const Messages = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const saveMessage = async message => {
    const response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const onChangeHandler = e => {
    setInput(e.target.value);
  };

  const messageArray = messages.map(item => {
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
  return (
    <section>
      <div className="messages-container">
        <style jsx>{`
          .messages-container {
            height: 500px;
            overflow: scroll;
          }
        `}</style>
        {messageArray}
      </div>
      <form
        className="messages-input"
        onSubmit={async e => {
          e.preventDefault();
          const message = {
            body: input,
            client_id: 4,
            lawyer_id: 2,
            date_sent: new Date(),
            from_client: true,
          };
          try {
            const newMessage = await saveMessage(message);
            setMessages([...messages, newMessage]);
            e.target.reset();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <style jsx>{`
          .messages-input {
            padding: 1em 1em 0 1em;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        `}</style>
        <TextField
          id="standard-basic"
          label="Type something..."
          variant="standard"
          onChange={onChangeHandler}
        />
        <Button type="submit">
          <SendIcon />
        </Button>
      </form>
    </section>
  );
};

export default Messages;
