import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  REGISTER_ERROR,
  ADD_PRUDUCT_SUCCESSFUL,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
  CLOSE_SNACKBAR,
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
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        selectedProduct: null,
        error: true,
        msg: "todo ok",
        severity: "success",
      };

    case CURRENT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload.data.products,
        error: true,
        msg: "hola todo ok?",
        severity: "success",
      };
    
    case REGISTER_ERROR:
      return {
        ...state,
        error: true,
        msg: action.payload,
        severity: "error",
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        error: false,
        msg: "",
      };
   
    default:
      return state;
  }
};
