import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import FavoriteReducer from "./FavoriteReducer";
import FavoriteContext from "./FavoriteContext";
import {
  GET_FAVORITES
} from "../../types";

const FavoriteState = (props) => {
  const initialState = {
    favoritesProducts: [],
    msg: null,
  };

  const [state, dispatch] = useReducer(FavoriteReducer, initialState);

  // obtener la lista de favoritos
  const getFavorites = async (userId) => {
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
      console.log(result)
      
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  
  
  return (
    <FavoriteContext.Provider
      value={{
        favoritesProducts: state.favoritesProducts,
        msg: state.msg,
        getFavorites,
        getFavoriteById
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteState;
