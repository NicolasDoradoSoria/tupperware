import React, { useReducer, useContext } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import clienteAxios from "../../config/axios";
import SnackBarContext from "../snackbarContext/SnackbarContext";
import Service from "../../service/Service"

import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CURRENT_PRODUCT,
  SEARCH_PRODUCTS,
  UPLOAD_PERCENTAGE,
  IMAGES_TO_UPLOAD,
  INITIALIZE_PRODUCT,
  FILTER_PRODUCT_BY_CATEGORY
} from "../../types";

const ProductState = (props) => {
  const service = new Service()

  const initialState = {
    products: [],
    productsAll: [],
    errorProducts: false,
    product: null,
    uploadPorcentage: 0,
    loading: true,
    imagesToUpload: []
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
      const result = await service.getProducts()
      dispatch({
        type: GET_PRODUCTS,
        payload: result.data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // eliminar el producto seleccionado
  const deleteProduct = async (e, product) => {
    try {
      const result = await clienteAxios.delete(`/api/products/${product._id}`);
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
  const addProduct = async (productNew) => {
  
    try {
     const result= await service.postAddProduct(productNew, state.imagesToUpload, productPercentageUpload)
      
      openSnackbar(result.data, "success")    
      getProducts()
    } catch (error) {
      console.log(error.response)
      openSnackbar(error.response.data.msg, "error")

    }
  };
  // actualizar un producto
  const updateProduct = async (data) => {
    try {

      const result = await clienteAxios.put(`api/products/${data._id}`, data)
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
      const filterProduct = await clienteAxios.post(`api/products/searchProducts`, data)
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
      const product = await clienteAxios.get(`api/products/${id}`)
      dispatch({
        type: CURRENT_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error)
    }
  }

const getFilterProductByCategory = async(id) =>{
  try {
    const product = await clienteAxios.get(`api/products?id=`+id)
    
    dispatch({
      type: FILTER_PRODUCT_BY_CATEGORY,
      payload: product.data.products
    });
  } catch (error) {
    console.log(error)
  }
}

  //search de producto, lo mismo que la anterior funcion pero esta no hace un llamado a la api PD: corregir...
  const saveCurrentProduct = async (productNew) => {
    dispatch({
      type: CURRENT_PRODUCT,
      payload: productNew
    })
  }

  const productPercentageUpload= async (persentage)  => {
    dispatch({
      type: UPLOAD_PERCENTAGE,
      payload: persentage
    })
  }

  //agrega una imagen a imagesToUpload con concat
  const setImagesToUpload = async (images) => {
    dispatch({
      type: IMAGES_TO_UPLOAD,
      payload: images
    })
  }
  
  //inicializa product y  imagesToUpload
  const initializeProduct =  () => {
    dispatch({
      type: INITIALIZE_PRODUCT,
    })
  }

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        productsAll: state.productsAll,
        product: state.product,
        uploadPorcentage: state.product,
        loading: state.loading,
        imagesToUpload: state.imagesToUpload,
        setImagesToUpload,
        getProducts,
        getFilterProductByCategory,
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct,
        saveCurrentProduct,
        searchProducts,
        productPercentageUpload,
        initializeProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
