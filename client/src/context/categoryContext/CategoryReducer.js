import {
  GET_CATEGORY
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }


}