import React, { useReducer } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import clienteAxios from "../../config/axios";
import {GET_PRODUCTS
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
      
    }
      
  }
  return (
    <ProductContext.Provider value={{
        products: state.products,
        getProducts
    }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
