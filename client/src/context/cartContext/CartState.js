import React, { useReducer, useContext } from "react";
import clienteAxios from "../../config/axios";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import SnackBarContext from "../snackbarContext/SnackbarContext";
import {
  GET_ORDERS, GENERATE_ORDER
} from "../../types";

const CartState = (props) => {
  const initialState = {
    orders: null,
    products: [],
    ordersAvailable: false
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

    //snackbarContext
    const snackbarContext = useContext(SnackBarContext);
    const {
      openSnackbar
    } = snackbarContext;

    
  // obtener los pedido del user
  const getOrder = async (userId) => {

    try {
      const result = await clienteAxios.get(`/api/shopping_cart/${userId}`);
      dispatch({
        type: GET_ORDERS,
        payload: result.data[0]
      });
    } catch (error) {
      console.log(error);
    }
  };

  // genera un pedido
  const generateOrder = async (data) => {
    try {
      const result = await clienteAxios.post(`api/shopping_cart`, data)
    
      dispatch({
        type: GENERATE_ORDER,
        payload: result.data
      });
      openSnackbar(result.data, "success")
    } catch (error) {
      console.log(error);
    }
  };

  // elimina producto de pedido
  const removeOrderProduct = async (userId, idOrder) => {
    try {
      const result = await clienteAxios.delete(`api/shopping_cart/${userId}/${idOrder}`)
      console.log(result)
      openSnackbar(result.data.msg, "success")
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        orders: state.orders,
        products: state.products,
        ordersAvailable: state.ordersAvailable,
        getOrder,
        generateOrder,
        removeOrderProduct,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
