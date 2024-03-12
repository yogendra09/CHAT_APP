import React, { useEffect, useState } from 'react'
import { asyncCurrentUser, asyncUserLogin } from '../../../store/Actions/userAction'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=> state.userReducer);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const LoginHandler = (e)=>{
    e.preventDefault();
    const user = {
      email,password
    }
    dispatch(asyncUserLogin(user))
  }

  useEffect(()=>{
    console.log(isAuthenticated)
    // dispatch(asyncCurrentUser());
     if(isAuthenticated) navigate("/");
  },[isAuthenticated])
  
  return (
    <div className='h-[100vh] w-full bg-red-200'>
       <form onSubmit={LoginHandler}>
        <input onChange={(e)=> setemail(e.target.value)} type="text" placeholder='email' />
        <input onChange={(e)=> setpassword(e.target.value)} type="text" placeholder='password' />
        <button>Login</button>
       </form>
    </div>
  )
}

export default Login