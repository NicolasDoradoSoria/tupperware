import {
  GET_ORDERS, GENERATE_ORDER, CLEAN_CART, DELETE_PRODUCT_CART
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const alert = {
    msg: action.payload.msg,
    category: "success",
  }

  switch (action.type) {
    case DELETE_PRODUCT_CART:
      return {
        ...state,
        orders: action.payload.order[0],
        productsInCart: action.payload.order[0].products,
        msg: alert
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        productsInCart: action.payload.products
      }
    case GENERATE_ORDER:
      return {
        ...state,
        ordersAvailable: true,
        msg: alert
      }
    case CLEAN_CART:
      return {
        ...state,
        productsInCart: [],
        orders: null,
        msg: action.payload,
      }
    default:
      return state
  }


}