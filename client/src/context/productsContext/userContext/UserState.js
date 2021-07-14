import React, { useReducer,useContext } from "react";
import clienteAxios from "../../../config/axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import tokenAuth from "../../../config/token";
import SnackBarContext from "../../snackbarContext/SnackbarContext";

import {
  REGISTER_SUCESS,
  GET_USER,
  REGISTER_ERROR,
  LOGIN_SUCCESSFUL,
  SIGN_OFF,
} from "../../../types";
const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //snackbarContext
  const snackbarContext = useContext(SnackBarContext);
  const {
    openSnackbar
  } = snackbarContext;

  // registra un usuario
  const registerUser = async (data) => {
    try {
      const response = await clienteAxios.post("/api/usuarios/signUp", data);
      dispatch({
        type: REGISTER_SUCESS,
        payload: response.data,
      });

      
      authenticatedUser();
    } catch (error) {
      openSnackbar(error.response.data.msg, "error")
    }
  };

  // devuelve el usuario autentificado
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
      openSnackbar("todo re piolaaaa", "success")
    } catch (error) {
      console.log(error.response);
    }
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
      openSnackbar(error.response.data.msg, "error")
      
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
        registerUser,
        login,
        signOff,
        authenticatedUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
