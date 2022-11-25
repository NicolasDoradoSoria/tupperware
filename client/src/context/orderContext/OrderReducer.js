import {
  GET_PAYMENT,
  PRODUCT_ERROR,
  DELETE_MSG,
  DELETE_ORDER
} from "../../types";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case PRODUCT_ERROR:
      return {
        ...state,
        msg: action.payload,
      }
    case GET_PAYMENT:
      return {
        ...state,
        orders: action.payload,
      }

      case DELETE_MSG:
      return {
        ...state,
        msg: null,
      }

      case DELETE_ORDER:
      const alerts = {
        msg: action.payload.msg,
        category: "success",
      }
      return {
        ...state,
        msg: alerts
      };

    default:
      return state
  }


}