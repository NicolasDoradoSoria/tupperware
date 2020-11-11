import React, { useEffect, useReducer } from "react";
import clienteAxios from "../../../config/axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { REGISTER_SUCESS, GET_USER, REGISTER_ERROR } from "../../../types";
import tokenAuth from "../../../config/token";
const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    msg: null,
    error: false
  };


  const [state, dispatch] = useReducer(UserReducer, initialState);



  const registerUser = async date => {
    try {
      
      const response = await clienteAxios.post("/api/usuarios", date);

      dispatch({
        type: REGISTER_SUCESS,
        payload: response.data
      });
      authenticatedUser();
    } catch (error) {
      // console.log(error.response.data.msg)
      dispatch({
        type: REGISTER_ERROR,


      });
    }
  };

  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        authenticated: state.authenticated,
        registerUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
