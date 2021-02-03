import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  CLOSE_SNACKBAR,
  REGISTER_ERROR,
  ADD_PRUDUCT_SUCCESSFUL
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case ADD_PRUDUCT_SUCCESSFUL:
    return {
      ...state,
      error: true,
      msg: action.payload,
      severity: "success",
    }

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        error: false,
        msg: "",
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: true,
        msg: action.payload,
        severity: "error",
      };
    default:
      return state;
  }
};
