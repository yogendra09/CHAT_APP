import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser } from "../../../store/Actions/userAction";
import { useNavigate } from "react-router-dom";
import Chat from "../../pages/chat/Chat";
import { socket } from "../../../socket";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(asyncCurrentUser());
    // console.log(user)
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return <div className="h-screen w-full flex ">
    <Chat/>
  </div>;
};

export default Home;
