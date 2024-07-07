const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./backend/routes/userRoutes");
const chatRoutes = require("./backend/routes/chatRoutes");
const messageRoutes = require("./backend/routes/messageRoutes");
const {
  errorHandler,
  notFound,
} = require("./backend/middlewares/errorMiddleware");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("HELLOOOO");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing"); // Emit to all in the room except sender
    console.log(`User in room ${room} is typing`);
  });

  // Event when a user stops typing
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing"); // Emit to all in the room except sender
    console.log(`User in room ${room} stopped typing`);
  });

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {  //to save bandwidth
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

