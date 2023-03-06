import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import FavoriteReducer from "./FavoriteReducer";
import FavoriteContext from "./FavoriteContext";
import {
  GET_FAVORITES
} from "../../types";

const FavoriteState = (props) => {
  const initialState = {
    products: null,
    msg: null,
  };

  const [state, dispatch] = useReducer(FavoriteReducer, initialState);

  // obtener los pedido del user
  const getFavorites = async (userId) => {
    try {
      const result = await clienteAxios.get(`/api/favorite`);
      console.log(result.data[0].favoriteProducts
        )
      dispatch({
        type: GET_FAVORITES,
        payload: result.data[0].favoriteProducts
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  return (
    <FavoriteContext.Provider
      value={{
        products: state.products,
        msg: state.msg,
        getFavorites
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteState;
