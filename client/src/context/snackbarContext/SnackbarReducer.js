import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                msg: action.payload,
            };
        case CLOSE_SNACKBAR:
            return {
                msg: "",
            };

        default:
            return state;
    }
};
