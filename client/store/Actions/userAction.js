import {
  addUser,
  isError,
  removeError,
  removeUser,
} from "../Reducers/userReducer";
import axios from "../../utils/axios";

export const asyncCurrentUser = () => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(data);
    dispatch(addUser(data));
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.message);
  }
};

export const asyncUserRegister = (newUser) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/register", newUser);
    console.log(data.token);
    localStorage.setItem("token", data.token);
    dispatch(addUser(data.user));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.message);
  }
};

export const asyncUserLogin = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/login", user);
    console.log(data.token);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.message);
  }
};
export const asyncUserLogout = () => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data);
    localStorage.removeItem("token");
    dispatch(removeUser());
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
  }
};
