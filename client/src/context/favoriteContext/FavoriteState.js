import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import FavoriteReducer from "./FavoriteReducer";
import FavoriteContext from "./FavoriteContext";
import {
  GET_FAVORITES,
  GET_FAVORITE_SUCCERFULL
} from "../../types";

const FavoriteState = (props) => {
  const initialState = {
    favoritesProducts: [],
    msg: null,
    isFavorite: false
  };

  const [state, dispatch] = useReducer(FavoriteReducer, initialState);

  // obtener la lista de favoritos
  const getFavorites = async () => {
    try {
      const result = await clienteAxios.get(`/api/favorite`);
      dispatch({
        type: GET_FAVORITES,
        payload: result.data[0].favoriteProducts
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  // pregunto al back si esta el producto incluido en el carrito o no
  const getFavoriteById = async (productId) => {
    try {
      const result = await clienteAxios.get(`/api/favorite/${productId}`);
      dispatch({
        type: GET_FAVORITE_SUCCERFULL,
        payload: result.data.isContained
      });

    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  
  
  return (
    <FavoriteContext.Provider
      value={{
        favoritesProducts: state.favoritesProducts,
        msg: state.msg,
        isFavorite: state.isFavorite,
        getFavorites,
        getFavoriteById
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteState;
