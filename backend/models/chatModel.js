const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chat_name: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      // group chat feature currently pending
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
