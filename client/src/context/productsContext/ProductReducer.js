import { GET_PRODUCTS, DELETE_PRODUCT } from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter((product) => product._id !== action.payload),
        };
  
    default:
      return state;
  }
};
