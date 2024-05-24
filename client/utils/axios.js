import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-app-server-059e.onrender.com/",
  withCredentials: true,
  
});

export default instance;


