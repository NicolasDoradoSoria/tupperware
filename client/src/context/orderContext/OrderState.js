import { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import {
    GET_PAYMENT,
    PRODUCT_ERROR,
    DELETE_MSG,
    DELETE_ORDER
} from "../../types";
import clienteAxios from "../../config/axios";

const OrderState = (props) => {
    const initialState = {
        orders: [],
        msg: null
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    // devuelve todos los pedidos
    const getOrder = async () => {
        try {
            const result = await clienteAxios.get(`/api/payment/`);
            dispatch({
                type: GET_PAYMENT,
                payload: result.data.order,
            });
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: "error"
            }
            dispatch({
                type: PRODUCT_ERROR,
                payload: alert,
            });
        }
    }
    // elimina un pedido
    const deleteOrder = async (data) => {
        try {
            const result = await clienteAxios.post("/api/payment/delete-order", data)
            // devuelve un msg para que muestre en pantalla 
            dispatch({
                type: DELETE_ORDER,
                payload: result.data,
            });
            // espera 5seg para que se elimine el msg del estado
            setTimeout(() => {
                dispatch({
                    type: DELETE_MSG,
                })
            }, 5000)
            getOrder()
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: "error"
            }
            dispatch({
                type: PRODUCT_ERROR,
                payload: alert,
            });
        }
    }
    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                msg: state.msg,
                getOrder,
                deleteOrder,
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
}

export default OrderState;