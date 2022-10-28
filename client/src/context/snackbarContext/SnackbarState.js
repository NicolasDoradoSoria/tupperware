import React, { useReducer } from "react";
import SnackbarReducer from "./SnackbarReducer";
import SnackBarContext from "./SnackbarContext";
import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "../../types";
const SnackbarState = (props) => {
    const initialState = {
        msg: null,
    };

    const [state, dispatch] = useReducer(SnackbarReducer, initialState);


    const openSnackbar = (msg, severity) => {
        const alert = {
            msg, severity
        }
        dispatch({
            type: OPEN_SNACKBAR,
            payload: alert,
        });

        setTimeout(() => {
            dispatch({
                type: CLOSE_SNACKBAR,
            })
        }, 5000)

    }
    return (
        <SnackBarContext.Provider
            value={{
                msg: state.msg,
                openSnackbar
            }}
        >
            {props.children}
        </SnackBarContext.Provider>
    );
}

export default SnackbarState;
