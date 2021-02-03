import React, { useReducer } from "react";
import clienteAxios from "../../../config/axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import {
  REGISTER_SUCESS,
  GET_USER,
  REGISTER_ERROR,
  CLOSE_SNACKBAR,
  LOGIN_SUCCESSFUL,
  SIGN_OFF,
} from "../../../types";
import tokenAuth from "../../../config/token";
const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    msg: null,
    error: false,
    severity: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // registra un usuario
  const registerUser = async (data) => {
    try {
      const response = await clienteAxios.post("/api/usuarios/signUp", data);
      dispatch({
        type: REGISTER_SUCESS,
        payload: response.data.user,
      });
      authenticatedUser();
    } catch (error) {
      ShowError(error.response.data.msg);
    }
  };
  // au8thenticated user
  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const ShowError = (msg) => {
    dispatch({
      type: REGISTER_ERROR,
      payload: msg,
    });
  };

//TODO: revisar esto
  const closeError = () => {
    dispatch({
      type: CLOSE_SNACKBAR,
    });
  };
  // pide una peticon a la api para iniciar sesion
  const login = async (data) => {
    try {
      const response = await clienteAxios.post("/api/auth/signin", data);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      console.log(error)
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  //cerrar secion
  const signOff = () => {
    try {
      dispatch({
        type: SIGN_OFF,
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        authenticated: state.authenticated,
        error: state.error,
        msg: state.msg,
        severity: state.severity,
        registerUser,
        ShowError,
        closeError,
        login,
        signOff,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
