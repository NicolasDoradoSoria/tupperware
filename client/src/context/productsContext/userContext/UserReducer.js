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
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
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
      };
    case SIGN_OFF:
      localStorage.removeItem("token");
      return{
        ...state,
        token: null,
        user: null,
        authenticated: null,
      }   
    default:
      return state;
  }
};
