import React from 'react'
import {Route,BrowserRouter, Routes} from "react-router-dom"
import Login from "./pages/login/Login"
import Register from './pages/register/Register'
import Home from './components/home/Home'
import { useSelector } from 'react-redux'
import Profile from "./pages/profile/Profile"
import Feed from './components/feed/Feed'
const App = () => {

  console.log("first")
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/feed' element={<Feed/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App