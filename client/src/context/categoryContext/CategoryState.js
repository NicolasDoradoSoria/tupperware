import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CategoryReducer from "./CategoryReducer";
import CategoryContext from "./CategoryContext";
import {
  GET_CATEGORY
} from "../../types";

const CategoryState = (props) => {
  const initialState = {
    categories: [],
    selectedCategory: null
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);


  // obtiene todas las categorias
  const getCategory = async () => {
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

  //guarda en selectedCategory la categoria que fue seleccionada en el Drawer
  const searchCategory = async (id) => {
    
  }
  return (
    <CategoryContext.Provider
      value={{
        getCategory,
        searchCategory,
        categories: state.categories,
        selectedCategory: state.selectedCategory
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
