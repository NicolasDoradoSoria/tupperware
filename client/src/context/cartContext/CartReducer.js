import {
  GET_ORDERS
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
      case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      }
    default:
      return state
    }

    
}