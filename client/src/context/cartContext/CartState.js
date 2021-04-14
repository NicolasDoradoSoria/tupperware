import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import {
  GET_ORDERS
} from "../../types";
const CartState = (props) => {
  const initialState = {
    orders: [],
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

  // agrega un pedido del user
  const addOrder = async (data) => {
    console.log(data)
    try {

      const result = await clienteAxios.post(`api/shopping_cart`, data)
      console.log(result)
      // // const result = await clienteAxios.get(`/api/shopping_cart/${orderId}`);
      // dispatch({
      //   type: GET_ORDERS,
      //   payload: result.data
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        orders: state.orders,
        getOrder,
        addOrder
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
