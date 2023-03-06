import {
  GET_FAVORITES
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_FAVORITES:
      return {
        ...state,
        products: action.payload,
      }

    default:
      return state
  }


}