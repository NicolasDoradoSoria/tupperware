import {
  GET_ORDERS, GENERATE_ORDER, CLEAN_CART, DELETE_PRODUCT_CART, DELETE_MSG
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_CART:
      const alerts = {
        msg: action.payload.msg,
        category: "success",
      }
      return {
        ...state,
        msg: alerts
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
    case GENERATE_ORDER:
      const alert = {
        msg: action.payload.msg,
        category: "success",
      }
      return {
        ...state,
        ordersAvailable: true,
        msg: alert
      }
    case CLEAN_CART:
      return {
        ...state,
        orders: null,
        msg: action.payload,
      }
    case DELETE_MSG:
      return {
        ...state,
        msg: null,
      }
    default:
      return state
  }


}