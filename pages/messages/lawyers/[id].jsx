import { Box, InputAdornment, Paper, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Message from "../../../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useRef, useContext } from "react";
import timeifyDate from "../../../helpers/timeifyDate";
import styles from "./index.module.scss";
import io from "socket.io-client";
import sessionOptions from "../../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { notificationsContext } from "../../../provider/NotificationsProvider";
const prisma = new PrismaClient();
let socket;

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const lawyerId = Number(params.id);
    const clientId = req.session.user.id;
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
        lawyers: true,
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
  const { clearNotifications } = useContext(notificationsContext);
  const lawyerProfilePic = initialMessages
    ? initialMessages[0].lawyers.profile_pic
    : null;
  const headerName = initialMessages
    ? `${initialMessages[0].lawyers.first_name} ${initialMessages[0].lawyers.last_name}`
    : "Messages";

  useEffect(() => {
    setHeader(() => ({ header: headerName, hidden: false }));
    setNavbar({ navbar: "", hidden: false });
    socketInitializer();
    const closeSocket = () => {
      socket.emit("input-change", false);
      socket.disconnect();
      console.log("Socket closed");
    };
    return closeSocket;
  }, []);

  useEffect(async () => {
    try {
      const seenMessages = await updateSeenMessageStatus({
        clientId,
        lawyerId,
      });
      setMessages(prev =>
        prev.map(message => ({ ...message, seen_client: true }))
      );
      clearNotifications();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // to stop typing indicator on page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", () =>
      socket.emit("input-change", false)
    );
    return () => {
      window.removeEventListener("beforeunload", () =>
        socket.emit("input-change", false)
      );
    };
  }, []);

  // to always scroll to bottom when new messages or typing indicator are present
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
      setMessages([...messages, { ...newMessage, seen_client: true }]);
    });
  };

  const updateSeenMessageStatus = async messageIds => {
    const response = await fetch("/api/messages/update", {
      method: "POST",
      body: JSON.stringify(messageIds),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
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
        fromClient={item.from_client}
        date={timeifyDate(item.date_sent)}
        profilePic={lawyerProfilePic}
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
          <Message profilePic={lawyerProfilePic}>
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
            from_client: true,
            seen_client: true,
          };
          try {
            const newMessage = await saveMessage(message);
            setMessages([...messages, newMessage]);
            socket.emit("send-message-from-client", newMessage);
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
