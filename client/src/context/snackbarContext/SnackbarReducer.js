import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                ...state,
                error: true,
                msg: action.payload.msg,
                severity: action.payload.severity,
            };
        case CLOSE_SNACKBAR:
            return {
                ...state,
                error: false,
                msg: "",
            };

        default:
            return state;
    }
};
