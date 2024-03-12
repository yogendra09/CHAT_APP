import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncCurrentUser,
  asyncUserRegister,
} from "../../../store/Actions/userAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterHandler = (e) => {
    console.log(email,password)
    e.preventDefault();
    const newUser = {
      email,
      username,
      password,
    };

    dispatch(asyncUserRegister(newUser));
  };

  useEffect(()=>{
    if(isAuthenticated) navigate("/");
  },[isAuthenticated])

  return (
    <div>
      <form onSubmit={RegisterHandler}>
        <input onChange={(e)=> setemail(e.target.value)}  type="text" placeholder="email" />
        <input onChange={(e)=> setusername(e.target.value)}  type="text" placeholder="username" />
        <input onChange={(e)=> setpassword(e.target.value)} type="text" placeholder="password" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
