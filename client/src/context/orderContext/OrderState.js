import { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import {
    GET_PAYMENT,
    PRODUCT_ERROR,
} from "../../types";
import clienteAxios from "../../config/axios";

const OrderState = (props) => {
    const initialState = {
        orders: [],
        msg: null
    };

    const [state, dispatch] = useReducer(OrderReducer, initialState);

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


    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                getOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
}

export default OrderState;