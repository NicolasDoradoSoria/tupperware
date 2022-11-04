import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CategoryReducer from "./CategoryReducer";
import CategoryContext from "./CategoryContext";
import {
  GET_CATEGORY,
  GET_CATEGORY_SEARCH,
  CLEAN_CATEGORY,
  CATEGORY_ERROR,
  ADD_CATEGORY,
  DELETE_MSG,
  DELETE_CATEGORY
} from "../../types";

const CategoryState = (props) => {
  const initialState = {
    categories: [],
    selectedCategory: null,
    msg: null
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);


  // obtiene todas las categorias
  const getCategory = async () => {
    try {
      const result = await clienteAxios.get(`/api/category`);
      dispatch({
        type: GET_CATEGORY,
        payload: result.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  //guarda en selectedCategory la categoria que fue seleccionada en el Drawer
  const categorySearch = async (id) => {
    try {
      const result = await clienteAxios.get(`/api/category?id=`+id);
      dispatch({
        type: GET_CATEGORY_SEARCH,
        payload: result.data
      });
      
    } catch (error) {
      console.log(error)
    }
  }

  //limpia la categoria que fue seleccionada 
  const cleanCategory = async () => {
    dispatch({
      type: CLEAN_CATEGORY,
    });
  }

  // guarda una categoria
  const addCategory = async (data) => {
    try {
      const result = await clienteAxios.post(`/api/category/`, data);
      dispatch({
        type: ADD_CATEGORY,
        payload: result.data
      });
      setTimeout(() => {
        dispatch({
          type: DELETE_MSG,
        })
      }, 5000)
    } catch (error) {
      console.log(error.response)
      const alert = {
        msg: error.response.data.msg,
        category: "error"
      }
      dispatch({
        type: CATEGORY_ERROR,
        payload: alert,
      });
    }
  }

   // elimina una categoria
   const deleteCategory = async (id) => {
    try {
      const result = await clienteAxios.delete(`/api/category/${id}`);
      dispatch({
        type: DELETE_CATEGORY,
        payload: result.data
      });
      setTimeout(() => {
        dispatch({
          type: DELETE_MSG,
        })
      }, 5000)
    } catch (error) {
      console.log(error.response)
      const alert = {
        msg: error.response.data.msg,
        category: "error"
      }
      dispatch({
        type: CATEGORY_ERROR,
        payload: alert,
      });
    }
  }
  return (
    <CategoryContext.Provider
      value={{
        getCategory,
        categorySearch,
        cleanCategory,
        addCategory,
        deleteCategory,
        categories: state.categories,
        selectedCategory: state.selectedCategory,
        msg: state.msg
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
