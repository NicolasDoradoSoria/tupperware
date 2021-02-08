import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  CLOSE_SNACKBAR,
  REGISTER_ERROR,
  ADD_PRUDUCT_SUCCESSFUL,
  EDIT_PRODUCT,
  CURRENT_PRODUCT
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
      
    case CURRENT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload.data.products,
        error: true,
        msg: "hola todo ok?",
        severity: "success",
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
