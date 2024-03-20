import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser } from "../../../store/Actions/userAction";
import { useNavigate } from "react-router-dom";
import Chat from "../chat/Chat";
import { socket } from "../../../socket";

const Home = () => {
  return <div className="h-screen w-full flex ">
    <Chat/>
  </div>;
};

export default Home;
