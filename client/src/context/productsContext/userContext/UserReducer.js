import {
  REGISTER_SUCESS,
  GET_USER,
  REGISTER_ERROR,
  LOGIN_SUCCESSFUL,
  SIGN_OFF,
} from "../../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
    case REGISTER_SUCESS:
      const alert = {
        msg: action.payload.data.msg,
        category: "success",
      }
      
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        authenticated: true,
        msg: alert,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: true
      };

    case REGISTER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        msg: action.payload,
      };

    case SIGN_OFF:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        loading: false
      }
    default:
      return state;
  }
};
