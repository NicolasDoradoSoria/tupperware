import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
  SEARCH_PRODUCTS,
  UPLOAD_PERCENTAGE
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsAll: action.payload,
      };

    case SEARCH_PRODUCTS:
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
        product: null,
      };

    case CURRENT_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case UPLOAD_PERCENTAGE:
      return {
        ...state,
        uploadPorcentage: action.payload
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload.data.products,
      };

    default:
      return state;
  }
};
