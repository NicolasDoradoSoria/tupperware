import React, { useReducer } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import clienteAxios from "../../config/axios";
import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  CLOSE_SNACKBAR,
  REGISTER_ERROR,
  ADD_PRUDUCT_SUCCESSFUL,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
  REMOVE_SELECTED_PRODUCT
} from "../../types";

const ProductState = (props) => {
  const initialState = {
    products: [],
    errorProducts: false,
    msg: null,
    error: false,
    severity: "",
    selectedProduct: null
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // obtener los productos
  const getProducts = async () => {
    try {
      const result = await clienteAxios.get("/api/productos");
      dispatch({
        type: GET_PRODUCTS,
        payload: result.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // eliminar el producto seleccionado
  const deleteProduct = async (id) => {
    
    try {
      const result = await clienteAxios.delete(`/api/productos/${id}`);
      console.log(result)

      dispatch({
        type: DELETE_PRODUCT,
        payload: result,
      });
    } catch (error) {
      console.log(error)
      // ShowError(error.response.data.msg);
    }
  };

  // agrega un producto
  const addProduct = async (data) => {
    try {
      const result = await clienteAxios.post(`api/productos`, data);

      dispatch({
        type: ADD_PRUDUCT_SUCCESSFUL,
        payload: result.data,
      });
      
    } catch (error) {
      ShowError(error.response.data.msg);
    }
  };
// actualizar un producto
  const updateProduct = async (data) => {
    try {
      
      const result = await clienteAxios.put(`api/productos/${data._id}`, data)
      dispatch({
        type: EDIT_PRODUCT,
        payload: result.data
      })
    } catch (error) {
      console.log(error.request)
    }
  }

  const saveCurrentProduct = async (product) =>{
    dispatch({
      type: CURRENT_PRODUCT,
      payload: product
    })
  }


  const closeError = () => {
    dispatch({
      type: CLOSE_SNACKBAR,
    });
  };

  const ShowError = (msg) => {
    dispatch({
      type: REGISTER_ERROR,
      payload: msg,
    });
  };


  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        getProducts,
        deleteProduct,
        addProduct,
        error: state.error,
        msg: state.msg,
        severity: state.severity,
        closeError,
        updateProduct,
        saveCurrentProduct,
        selectedProduct: state.selectedProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
