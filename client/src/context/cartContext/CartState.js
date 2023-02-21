import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import {
  GET_ORDERS, GENERATE_ORDER, CLEAN_CART, DELETE_PRODUCT_CART, DELETE_MSG
} from "../../types";

const CartState = (props) => {
  const initialState = {
    orders: null,
    productsInCart: [],
    ordersAvailable: false,
    msg: null
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // obtener los pedido del user
  const getOrder = async (userId) => {
    try {
      const result = await clienteAxios.get(`/api/cart/${userId}`);

      dispatch({
        type: GET_ORDERS,
        payload: result.data[0]
      });
    } catch (error) {
      console.log(error.response.data);
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
      setTimeout(() => {
        dispatch({
          type: DELETE_MSG,
        })
      }, 5000)
    } catch (error) {
      console.log(error);
    }
  };

  // elimina producto de pedido
  const removeOrderProduct = async (userId, idOrder) => {
    try {
      const result = await clienteAxios.delete(`api/cart/${userId}/${idOrder}`)
      console.log(result)
      dispatch({
        type: DELETE_PRODUCT_CART,
        payload: result.data
      });
      getOrder(userId)
      setTimeout(() => {
        dispatch({
          type: DELETE_MSG,
        })
      }, 5000)
    } catch (error) {
      console.log(error);
    }
  };

  //limpia el carrito
  const cleanCart = async (userId) => {
    try {
      const result = await clienteAxios.delete(`api/cart/${userId}`)
      const alert = {
        msg: result.data.msg,
        category: "success",
      }
      dispatch({
        type: CLEAN_CART,
        payload: alert
      });
      getOrder(userId)

      setTimeout(() => {
        dispatch({
          type: DELETE_MSG,
        })
      }, 5000)
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
        msg: state.msg,
        getOrder,
        generateOrder,
        removeOrderProduct,
        cleanCart,
        
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
