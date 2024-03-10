import React, { useEffect, useRef, useState } from "react";
import SendingMessage from "../message/SendingMessage";
import ReceivingMessage from "../message/ReceivingMesaage";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { socket } from "../../../socket";
import { useSelector } from "react-redux";
import { MdAttachFile } from "react-icons/md";

const ChatArea = ({ chatPartner, displayMsg, setdisplayMsg }) => {
  const containerRef = useRef(null);
  const [newMessage, setnewMessage] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  const sendnewPrivateMessage = () => {
    if (newMessage == "") return;
    const message = {
      sender: user.username,
      receiver: chatPartner.username,
      message: newMessage,
      date:Date.now()
    };
    setdisplayMsg([...displayMsg, message]);
    socket.emit("sendPrivateMessage", message);
    setnewMessage("");
  };

  socket.on("receive_private_message", function (data) {
    console.log(data.sender, chatPartner.username);
    data.sender === chatPartner.username &&
      setdisplayMsg([...displayMsg, data]);
  });
  const keepScrollbarAtBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    keepScrollbarAtBottom();
  });

  return (
    <div className="flex flex-col flex-auto h-full w-[80vw] p-2">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-300 h-full p-4">
        <div className="h-[8vh] w-full flex items-center justify-between px-2 gap-2 ">
          <div className="flex items-center gap-2">
            <div className="h-[7vh] w-[7vh] rounded-full bg-black">
              <img
                className="rounded-full h-full w-full object-cover"
                src={chatPartner && chatPartner.image.url}
                alt=""
              />
            </div>
            <h1 className="text-sm">{chatPartner && chatPartner.username}</h1>
          </div>
          <div className="w-[20vh] h-full bg-slate-300"></div>
        </div>
        <div className="flex flex-col w-full h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div
              ref={containerRef}
              className={`chatarea${chatPartner.username} w-full grid grid-cols-12 gap-y-2 overflow-y-auto`}
            >
              {displayMsg.map((msg, index) => {
                return msg.sender === user.username ? (
                  <SendingMessage
                    key={index}
                    message={msg.message}
                    date={new Date(msg.date).toLocaleTimeString()}
                  />
                ) : (
                  <ReceivingMessage
                    key={index}
                    message={msg.message}
                    date={new Date(msg.date).toLocaleTimeString()}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div>
            <MdAttachFile className="text-2xl" />
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
              value={newMessage}
                onChange={(e) => setnewMessage(e.target.value)}
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              onClick={sendnewPrivateMessage}
              className="flex items-center justify-center gap-1 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              <span>Send</span>
              <IoMdSend className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
