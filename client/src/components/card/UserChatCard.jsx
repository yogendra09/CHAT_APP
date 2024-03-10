import React from "react";

const UserChatCard = ({username,image}) => {
  return (
    <div>
      <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full">
        <div className="flex items-center justify-center h-9 w-9 bg-indigo-200 rounded-full">
          <img className="h-full w-full object-cover rounded-full" src={image} alt="" />
        </div>
        <div className="ml-2 text-sm font-semibold">{username}</div>
      </button>
    </div>
  );
};

export default UserChatCard;
