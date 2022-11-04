import {
  GET_CATEGORY,
  GET_CATEGORY_SEARCH,
  CLEAN_CATEGORY,
  CATEGORY_ERROR,
  ADD_CATEGORY,
  DELETE_MSG,
  DELETE_CATEGORY
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload
      }
      
      case DELETE_CATEGORY:
      case ADD_CATEGORY:
        const alert = {
          msg: action.payload.msg,
          category: "success",
        }
        return {
          ...state,
          categories: action.payload.categoryList,
          msg: alert
        }
    case GET_CATEGORY_SEARCH:
      return {
        ...state,
        selectedCategory: action.payload[0]
      }
    case CLEAN_CATEGORY:
      return {
        ...state,
        selectedCategory: null
      }
    case CATEGORY_ERROR:
      return {
        ...state,
        msg: action.payload,
      }
      case DELETE_MSG:
        return {
          ...state,
          msg: null,
        }

    default:
      return state
  }


}