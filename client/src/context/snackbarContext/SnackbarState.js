import React, { useReducer } from "react";
import SnackbarReducer from "./SnackbarReducer";
import SnackBarContext from "./SnackbarContext";
import {
    CLOSE_SNACKBAR, OPEN_SNACKBAR
} from "../../types";
const SnackbarState = (props) => {
    const initialState = {
        msg: null,
        error: false,
        severity: "",
    };

    const [state, dispatch] = useReducer(SnackbarReducer, initialState);

    const closeSnackbar = () => {
        try {
            dispatch({
                type: CLOSE_SNACKBAR,
            }); 
        } catch (error) {
            console.log(error)
        }
    };

    const openSnackbar = (msg, severity) => {
        const data = {
            msg,
            severity
        }
        console.log(data)
        try {
            dispatch({
                type: OPEN_SNACKBAR,
                payload: data,
            });
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <SnackBarContext.Provider
            value={{
                msg: state.msg,
                error: state.error,
                severity: state.severity,
                closeSnackbar,
                openSnackbar
            }}
        >
            {props.children}
        </SnackBarContext.Provider>
    );
}

export default SnackbarState;
