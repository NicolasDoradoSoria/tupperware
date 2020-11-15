import { REGISTER_SUCESS, GET_USER, REGISTER_ERROR,CLOSE_SNACKBAR, LOGIN_SUCCESSFUL } from "../../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
    case REGISTER_SUCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        mensaje: null,
        error: false
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        error:true,
        token: null,
        user: null,
        authenticated: null,
        msg: action.payload,
        severity: "error"
      };

      case CLOSE_SNACKBAR:
      return{
        ...state,
        error: false,
        msg: "",
      }
    default:
      return state;
  }
};
