import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CategoryReducer from "./CategoryReducer";
import CategoryContext from "./CategoryContext";
import {
  GET_CATEGORY
} from "../../types";

const CategoryState = (props) => {
  const initialState = {
    categories: []
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);


  // obtiene todas las categorias
  const getCategory= async () => {
    const result = await clienteAxios.get(`/api/category`);
    try {
      dispatch({
        type: GET_CATEGORY,
        payload: result.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CategoryContext.Provider
      value={{
        getCategory,
        categories: state.categories
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
