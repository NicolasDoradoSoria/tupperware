import { REGISTER_SUCESS, GET_USER, REGISTER_ERROR } from "../../../types";

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
      return {
        ...state,
        token: null,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
