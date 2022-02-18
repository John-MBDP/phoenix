import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", socket => {
      socket.on("input-change", bool => {
        socket.broadcast.emit("update-typing-status", bool);
      });
      socket.on("send-message", newMessage => {
        socket.broadcast.emit("update-messages", newMessage);
      });
    });
  }
  res.end();
};

export default SocketHandler;
