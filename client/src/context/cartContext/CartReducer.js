import {
  GET_ORDERS, GENERATE_ORDER,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        products: action.payload.products
      }
    case GENERATE_ORDER:
      return {
        ...state,
        ordersAvailable: true
      }
    default:
      return state
  }


}