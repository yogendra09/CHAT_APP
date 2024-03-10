const { Server } = require("socket.io");
const userModel = require("./models/userModel");
const chatModel = require("./models/chatModel");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("server_joined", async (data) => {
      const currentUser = await userModel.findOne({ username: data.user });

      console.log(data);
      await userModel.findOneAndUpdate(
        { username: data.user },
        {
          socketId: socket.id,
        }
      );

      const activeUsers = await userModel.find({
        socketId: { $nin: ["", socket.id] },
        // username: { $nin: data.user },
      });

      // console.log(activeUsers)
      socket.emit("activeUsers", activeUsers);
    });

    socket.on("sendPrivateMessage", async (message) => {
      const receiverUser = await userModel.findOne({
        username: message.receiver,
      });

      const newMessage = await chatModel({
        sender: message.sender,
        receiver: message.receiver,
        message: message.message,
      });

      await newMessage.save();

      socket.to(receiverUser.socketId).emit("receive_private_message", message);
    });

    socket.on("fetchMessages", async (data) => {
      console.log(data.receiver.username);
      const allMessages = await chatModel.find({
        $or: [
          {
            sender: data.sender.username,
            receiver: data.receiver.username,
          },
          {
            sender: data.receiver.username,
            receiver: data.sender.username,
          },
        ],
      });

      socket.emit("fetchPrivateMessages", allMessages);
    });

    socket.on("disconnect", async () => {
      console.log("A user disconnected!");
      await userModel.findOneAndUpdate(
        {
          socketId: socket.id,
        },
        {
          socketId: "",
        }
      );
    });
  });
};
