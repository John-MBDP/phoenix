import { Box, InputAdornment, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../../../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useRef } from "react";
import timeifyDate from "../../../helpers/timeifyDate";
import styles from "../lawyers/index.module.scss";
import io from "socket.io-client";
import sessionOptions from "../../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
const prisma = new PrismaClient();
let socket;

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const lawyerId = req.session.user.lawyer_id;
    const clientId = Number(params.id);
    const messages = await prisma.messages.findMany({
      where: {
        client_id: {
          equals: clientId,
        },
        lawyer_id: {
          equals: lawyerId,
        },
      },
      include: {
        clients: true,
      },
      orderBy: [
        {
          date_sent: "asc",
        },
      ],
    });
    return {
      props: {
        lawyerId,
        clientId,
        initialMessages: messages,
      },
    };
  },
  sessionOptions
);

const Messages = ({
  initialMessages,
  lawyerId,
  clientId,
  setHeader,
  setNavbar,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);

  useEffect(() => {
    setHeader(() => ({ header: "Messages", hidden: false }));
    setNavbar({ navbar: "", hidden: false });
    socketInitializer();
    const closeSocket = () => {
      socket.disconnect();
      console.log("Socket closed");
    };
    return closeSocket;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingIndicator]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-typing-status", bool => {
      setTypingIndicator(bool);
    });

    socket.on("update-messages", newMessage => {
      setMessages([...messages, newMessage]);
    });
  };

  const saveMessage = async message => {
    const response = await fetch("/api/messages/create", {
      method: "POST",
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  };

  const onChangeHandler = e => {
    console.log(socket.disconnected);
    setInput(e.target.value);
    e.target.value
      ? socket.emit("input-change", true)
      : socket.emit("input-change", false);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  const messageArray = messages.map(item => {
    return (
      <Message
        key={item.id}
        fromClient={!item.from_client}
        date={timeifyDate(item.date_sent)}
      >
        {item.body}
      </Message>
    );
  });
  return (
    <>
      <div className={styles.messages_container}>
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
      <div ref={messagesEndRef} />
      <form
        className={styles.messages_input}
        onSubmit={async e => {
          e.preventDefault();
          const message = {
            body: input,
            client_id: clientId,
            lawyer_id: lawyerId,
            date_sent: new Date(),
            from_client: false,
          };
          try {
            const newMessage = await saveMessage(message);
            setMessages([...messages, newMessage]);
            socket.emit("send-message", newMessage);
            socket.emit("input-change", false);
            setInput("");
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <TextField
          id="standard-basic"
          label="Type something..."
          variant="standard"
          onChange={onChangeHandler}
          value={input}
          fullWidth
          autoComplete="off"
        />
        <Button type="submit">
          <SendIcon />
        </Button>
      </form>
    </>
  );
};

export default Messages;
