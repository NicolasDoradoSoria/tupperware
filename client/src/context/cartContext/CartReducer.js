import {
  GET_ORDERS, GENERATE_ORDER, CLOSE_SNACKBAR
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
      case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
      case GENERATE_ORDER:
      return {
        ...state,
        error: true,
        msg: action.payload,
        severity: "success",
        ordersAvailable: true
      }
      case CLOSE_SNACKBAR:
      return {
        ...state,
        error: false,
        msg: "",
      };
    default:
      return state
    }

    
}