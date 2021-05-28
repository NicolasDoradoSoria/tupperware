import React, { useReducer, useContext } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import clienteAxios from "../../config/axios";
import SnackBarContext from "../snackbarContext/SnackbarContext";

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
} from "../../types";

const ProductState = (props) => {
  const initialState = {
    products: [],
    errorProducts: false,
    selectedProduct: null
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);


  //snackbarContext
  const snackbarContext = useContext(SnackBarContext);
  const {
    openSnackbar
  } = snackbarContext;

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
      dispatch({
        type: DELETE_PRODUCT,
        payload: result,
      });

      openSnackbar("todo ok", "success")
    } catch (error) {
      console.log(error)
      openSnackbar(error.response.data.msg, "error")
    }
  };

  // agrega un producto
  const addProduct = async (data, image) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("descripcion", data.descripcion);
    formData.append("photoURL", image);


    try {
      const result = await clienteAxios.post(`api/productos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      openSnackbar(result.data, "success")
      openSnackbar(result.data, "success")
    } catch (error) {
      openSnackbar(error.response.data.msg, "error")

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
      
      openSnackbar("todo ok", "success")
    } catch (error) {
      console.log(error.request)
    }
  }

  //search de productos
  const searchProducts = async (data) => {
    try {
      const filterProduct = await clienteAxios.post(`api/productos/searchProducts`, data)
      dispatch({
        type: GET_PRODUCTS,
        payload: filterProduct.data,
      });
    } catch (error) {
      console.log(error)
    }
  }

  //search de producto por ID
  const getProduct = async (id) => {
    try {
      const product = await clienteAxios.get(`api/productos/${id}`)
      dispatch({
        type: CURRENT_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error)
    }
  }
  const saveCurrentProduct = async (product) => {
    dispatch({
      type: CURRENT_PRODUCT,
      payload: product
    })
  }


  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        getProducts,
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct,
        saveCurrentProduct,
        selectedProduct: state.selectedProduct,
        searchProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
