import { Box, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

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
  });
  return {
    props: {
      data: messages,
    },
  };
}

const Messages = ({ data }) => {
  const [input, setInput] = useState("");

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", msg => {
      setInput(msg);
      console.log("changed");
    });
  };

  const onChangeHandler = e => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  const messageArray = data.map(item => {
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
      <form className="messages-input">
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
          value={input}
          onChange={onChangeHandler}
        />
        <Button>
          <SendIcon />
        </Button>
      </form>
    </section>
  );
};

export default Messages;
