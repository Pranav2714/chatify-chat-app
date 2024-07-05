const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/user");
const Chat = require("../models/chatModel");

// Fetch all messages for a specific chat
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email") // Populate sender details
      .populate("chat") // Populate chat details
      .exec();

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Send a new message
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    // Create a new message document
    const newMessage = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId, // Assign chatId to chat field
    });

    // Populate sender, chat, and chat.users fields in the message document
    await newMessage.populate("sender", "name pic");
    await newMessage.populate("chat");
    await User.populate(newMessage, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latestMessage field in the corresponding chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    // Return the populated message object as JSON response
    res.json(newMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
