import { prisma } from "../../../lib/prisma";
import Message from "../../../components/Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useRef, useContext } from "react";
import timeifyDate from "../../../helpers/timeifyDate";
import styles from "../lawyers/index.module.scss";
import io from "socket.io-client";
import sessionOptions from "../../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { notificationsContext } from "../../../provider/NotificationsProvider";
import filterBadWords from "../../../lib/filter";
let socket;

export const getServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const lawfirmId = Number(params.id);
    const clientId = req.session.user.id;
    const messages = await prisma.messages.findMany({
      where: {
        client_id: {
          equals: clientId,
        },
        law_firm_id: {
          equals: lawfirmId,
        },
      },
      include: {
        lawfirms: true,
      },
      orderBy: [
        {
          date_sent: "asc",
        },
      ],
    });
    const lawfirm = await prisma.lawfirms.findUnique({
      where: {
        id: lawfirmId,
      },
    });
    return {
      props: {
        lawfirmId,
        clientId,
        initialMessages: messages,
        lawfirm,
      },
    };
  },
  sessionOptions
);

const Messages = ({
  initialMessages,
  lawfirmId,
  clientId,
  lawfirm,
  setHeader,
  setNavbar,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);
  const { clearNotifications } = useContext(notificationsContext);
  const lawfirmProfilePic = lawfirm.profile_pic;
  const headerName = lawfirm.name;

  useEffect(() => {
    setHeader(() => ({ header: headerName, hidden: false }));
    setNavbar({ navbar: "", hidden: false });
    socketInitializer();
    clearNotifications();
    const closeSocket = () => {
      socket.emit("input-change", false);
      socket.disconnect();
      console.log("Socket closed");
      clearNotifications();
    };
    return closeSocket;
  }, []);

  useEffect(async () => {
    try {
      const seenMessages = await updateSeenMessageStatus({
        clientId,
        lawfirmId,
      });
      setMessages(prev => {
        const updatedMessages = prev.map(message => ({
          ...message,
          seen_client: true,
        }));
        return updatedMessages;
      });
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

    socket.on("update-client-messages", async newMessage => {
      try {
        const seenMessages = await updateSeenMessageStatus({
          clientId,
          lawfirmId,
        });
        setMessages(prev => [...prev, { ...newMessage, seen_client: true }]);
        // socket.emit("client-present", true);
      } catch (err) {
        console.log(err);
      }
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
      body: JSON.stringify({ ...message, body: filterBadWords(message.body) }),
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
    if (e.nativeEvent.inputType === "insertLineBreak") {
      messageFormSend.current && messageFormSend.current.click();
    }
  };

  const messagesEndRef = useRef(null);
  const messageFormSend = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  const messageArray = messages.map(item => {
    return (
      <Message
        key={item.id}
        senderId={lawfirmId}
        fromClient={item.from_client}
        date={timeifyDate(item.date_sent)}
        profilePic={lawfirmProfilePic}
        route="lawfirm"
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
          <Message profilePic={lawfirmProfilePic}>
            <div className={styles.typing_indicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Message>
        )}
        {messageArray.length < 1 && (
          <Message profilePic={"/images/lawyers/bot_icon_still_2x.jpg"}>
            Welcome to Phoenix Chat! Please feel free to start the conversation!
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
            law_firm_id: lawfirmId,
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
        <Button type="submit" ref={messageFormSend}>
          <SendIcon style={{ color: "#ff0056" }}/>
        </Button>
      </form>
    </>
  );
};

export default Messages;
