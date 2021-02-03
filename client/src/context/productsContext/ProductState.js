import React, { useReducer } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import clienteAxios from "../../config/axios";
import {GET_PRODUCTS, DELETE_PRODUCT
} from '../../types'

const ProductState = (props) => {
  const initialState = {
    products: [],
    errorProducts: false,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // obtener los productos
  const getProducts = async () =>{
    try {
      const result = await clienteAxios.get("/api/productos")
      dispatch({
        type: GET_PRODUCTS,
        payload: result.data.products
      })
    } catch (error) {
      console.log(error)
    }
      
  }
// eliminar el producto seleccionado
const deleteProduct = async (id) =>{
  try {

    await clienteAxios.delete(`/api/productos/${id}`)
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    })
  } catch (error) {
    console.log(error)
  }
    
}

// agrega un producto
const addProduct = async (data) => {
  try {
    await clienteAxios.post(`api/productos`, data)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <ProductContext.Provider value={{
        products: state.products,
        getProducts,
        deleteProduct,
        addProduct
    }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
