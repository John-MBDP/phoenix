import { Box, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../../../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import io from "socket.io-client";
let socket;

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const messages = await prisma.messages.findMany({
    where: {
      lawyer_id: {
        equals: Number(context.params.id),
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

const Messages = ({ initialMessages, setHeader }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);

  useEffect(() => {
    setHeader({ header: "MESSAGES", hidden: false });
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", bool => {
      setTypingIndicator(bool);
    });
  };

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
    e.target.value
      ? socket.emit("input-change", true)
      : socket.emit("input-change", false);
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
        {typingIndicator && (
          <Message>
            <div className={styles.typing_indicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Message>
        )}
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
