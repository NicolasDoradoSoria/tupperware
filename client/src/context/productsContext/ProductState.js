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
  SEARCH_PRODUCTS
} from "../../types";

const ProductState = (props) => {
  const initialState = {
    products: [],
    productsAll: [],
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
  const addProduct = async (product) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("descripcion", product.descripcion);
    formData.append("stock", product.stock);

    for (let i = 0; i < product.files.length; i++) {
      formData.append('files', product.files[i]);
    }

    try {
      const result = await clienteAxios.post(`api/productos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      openSnackbar(result.data, "success")
      getProducts()
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
      console.log(result)
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
        type: SEARCH_PRODUCTS,
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
    console.log(product)
    dispatch({
      type: CURRENT_PRODUCT,
      payload: product
    })
  }


  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        productsAll: state.productsAll,
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
