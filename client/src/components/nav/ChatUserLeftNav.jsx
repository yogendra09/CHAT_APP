import React from "react";
import UserChatCard from "../card/UserChatCard";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import { MdGroup } from "react-icons/md";
import { removeUser } from "../../../store/Reducers/userReducer";
import { asyncUserLogin, asyncUserLogout } from "../../../store/Actions/userAction";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ChatUserLeftNav = ({ setchatPartner, setdisplayMsg }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { activeUsers } = useSelector((state) => state.userReducer);
  const fetchMessages = (receiver) => {
    socket.emit("fetchMessages", { sender: user, receiver: receiver });
    socket.on("fetchPrivateMessages", (data) => {
      setdisplayMsg([...data]);
    });
  };

  const serachUser = () => {
    
  };

  return (
    <>
      <div className="relative tex">
        <div className="flex flex-col py-6 pl-4 pr-2 w-[42vh] bg-white flex-shrink-0">
          <div className="flex flex-row items-center  h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <img
                className="h-full w-full object-cover rounded-full"
                src={user && user.image.url}
                alt=""
              />
            </div>
            <div className="ml-2 font-bold text-2xl" onClick={()=>{dispatch(asyncUserLogout())}}>
              {user && user.username}
            </div>
            <div className="absolute right-2">
              <Link to='/feed'>feed</Link>
              <Link to='/profile'>profile</Link>
              <IoSearchOutline className="text-2xl mt-2" onClick={serachUser
              } />
            </div>
          </div>
        <div className="h-10 mt-2 bg-red-200">
           <input className="h-full w-full outline-none border-[1px] border-[#000] p-2 rounded-md" type="text" placeholder="Serach user..." />
        </div>
          <div className="flex flex-col mt-6">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {activeUsers && activeUsers.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {activeUsers &&
                activeUsers.map((user) => {
                  return (
                    <div
                      key={user._id}
                      onClick={() => {
                        fetchMessages(user);
                        setchatPartner(user);
                      }}
                    >
                      <UserChatCard
                        key={user._id}
                        username={user.username}
                        image={user.image.url}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Groups</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                7
              </span>
            </div>
            <div className="max-h-[34vh] bg-slate-500 overflow-y-auto flex flex-col space-y-1 mt-4 -mx-2">
              <UserChatCard username={"amit"} />
              <UserChatCard username={"amit"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUserLeftNav;
