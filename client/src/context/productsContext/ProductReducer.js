import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
  SEARCH_PRODUCTS,
  UPLOAD_PERCENTAGE,
  IMAGES_TO_UPLOAD,
  INITIALIZE_PRODUCT,
  FILTER_PRODUCT_BY_CATEGORY,
  PRODUCT_ERROR,
  PRODUCT_SUCCESSFUL,
  DELETE_MSG
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
    case PRODUCT_ERROR:
      return {
        ...state,
        msg: action.payload,
      }

    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case EDIT_PRODUCT:
      const alert = {
        msg: action.payload.msg,
        category: "success",
      }
      return {
        ...state,
        products: action.payload.products,
        msg: alert,
        product: null,
        imagesToUpload: []
      };

    case CURRENT_PRODUCT:
      return {
        ...state,
        product: action.payload,
        imagesToUpload: action.payload.images,
      };

    case UPLOAD_PERCENTAGE:
      return {
        ...state,
        uploadPorcentage: action.payload
      }

    case PRODUCT_SUCCESSFUL:
    case DELETE_PRODUCT:
      const alerts = {
        msg: action.payload.msg,
        category: "success",
      }
      return {
        ...state,
        msg: alerts
      };

    case IMAGES_TO_UPLOAD:
      return {
        ...state,
        imagesToUpload: state.imagesToUpload.concat(action.payload),
      };

    case INITIALIZE_PRODUCT:
      return {
        ...state,
        imagesToUpload: [],
        product: null
      }

    case FILTER_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      }
    case DELETE_MSG:
      return {
        ...state,
        msg: null,
      }
    default:
      return state;
  }
};
