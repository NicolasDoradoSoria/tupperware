import {
  GET_CATEGORY,
  GET_CATEGORY_SEARCH,
  CLEAN_CATEGORY
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload
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
  
      
    default:
      return state
  }


}