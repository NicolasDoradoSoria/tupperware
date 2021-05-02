import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import {
  GET_ORDERS, GENERATE_ORDER, CLOSE_SNACKBAR
} from "../../types";
const CartState = (props) => {
  const initialState = {
    orders: [],
    msg: null,
    error: false,
    severity: "",
    ordersAvailable: false
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // obtener los pedido del user
  const getOrder = async (userId) => {

    try {
      const result = await clienteAxios.get(`/api/shopping_cart/${userId}`);
      dispatch({
        type: GET_ORDERS,
        payload: result.data[0].products
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
    } catch (error) {
      console.log(error);
    }
  };

  // actualiza un pedido
  const updateOrder = async (data) => {
    try {
      const result = await clienteAxios.put(`api/shopping_cart/${data.user}`, data)
      console.log(result)
    
      // dispatch({
      //   type: GENERATE_ORDER,
      //   payload: result.data
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const closeError = () => {
    dispatch({
      type: CLOSE_SNACKBAR,
    });
  };
  return (
    <CartContext.Provider
      value={{
        orders: state.orders,
        msg: state.msg,
        error: state.error,
        severity: state.severity,
        ordersAvailable: state.ordersAvailable,
        getOrder,
        generateOrder,
        updateOrder,
        closeError
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
