import { addUser,isError,removeError,removeUser } from "../Reducers/userReducer";
import axios from "../../utils/axios";


export const asyncCurrentUser = () => async (dispatch, getstate) => {
    try {
      const { data } = await axios.post("/user");
      // console.log(data.user);
      dispatch(addUser(data.user));
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
    }
  };


export const asyncUserRegister = (newUser) => async (dispatch, getstate) => {
    try {
      const { data } = await axios.post("/register",newUser);
      console.log(data)
      dispatch(addUser(data.user));
      // dispatch(asyncCurrentUser());
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
    }
  };

export const asyncUserLogin = (user) => async (dispatch, getstate) => {
    try {
      const { data } = await axios.post("/login",user);
      // console.log(data.token)
      dispatch(asyncCurrentUser());
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
    }
  };
export const asyncUserLogout = () => async (dispatch, getstate) => {
    try {
      const { data } = await axios.post("/logout");
      dispatch(removeUser());
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
    }
  };