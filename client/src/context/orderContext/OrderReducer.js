import {
  GET_PAYMENT,
  PRODUCT_ERROR,
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

    default:
      return state
  }


}