import { REGISTER_SUCESS, GET_USER, REGISTER_ERROR,CLOSE_SNACKBAR } from "../../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        authenticated: true,
        mensaje: null,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case REGISTER_ERROR:
      console.log(action.payload)
      return {
        ...state,
        error:true,
        token: null,
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
