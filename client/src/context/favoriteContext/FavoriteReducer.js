import {
  GET_FAVORITES,
  GET_FAVORITE_SUCCERFULL
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {

    case GET_FAVORITES:
      return {
        ...state,
        favoritesProducts: action.payload,
      }
    case GET_FAVORITE_SUCCERFULL:
      return {
        ...state,
        isFavorite: action.payload
      }
    default:
      return state
  }


}