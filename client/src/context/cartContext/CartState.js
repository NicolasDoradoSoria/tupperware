import React, { useReducer, useContext } from "react";
import clienteAxios from "../../config/axios";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import SnackBarContext from "../snackbarContext/SnackbarContext";
import {
  GET_ORDERS, GENERATE_ORDER, CLEAN_CART
} from "../../types";

const CartState = (props) => {
  const initialState = {
    orders: null,
    productsInCart: [],
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
    const result = await clienteAxios.get(`/api/cart/${userId}`);
    try {
      dispatch({
        type: GET_ORDERS,
        payload: result.data[0]
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // genera un pedido
  const generateOrder = async (data) => {
    try {
      const result = await clienteAxios.post(`api/cart`, data)

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
      const result = await clienteAxios.delete(`api/cart/${userId}/${idOrder}`)
      openSnackbar(result.data.msg, "success")

    } catch (error) {
      console.log(error);
    }
  };

  //limpia el carrito
  const cleanCart = async (userId) => {
    try {
      const result = await clienteAxios.delete(`api/cart/${userId}`)
      dispatch({
        type: CLEAN_CART,
      });
      openSnackbar(result.data.msg, "success")
    } catch (error) {
      console.log(error.msg);
    }
  }
  return (
    <CartContext.Provider
      value={{
        orders: state.orders,
        productsInCart: state.productsInCart,
        ordersAvailable: state.ordersAvailable,
        getOrder,
        generateOrder,
        removeOrderProduct,
        cleanCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
