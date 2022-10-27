import React, { useReducer, useContext } from 'react';
import FileContext from "./FileContext";
import FileReducer from "./FileReducer";
import Service from "../../service/Service"
import {
    UPLOADER_MULTIPPLE_IMAGES,
} from "../../types";
import SnackBarContext from '../snackbarContext/SnackbarContext';

const FileState = (props) => {
    const service = new Service()
    const initialState = {
        images: [],
        postImage: []
    };

    const [state, dispatch] = useReducer(FileReducer, initialState);

    //snackbarContext
    const snackbarContext = useContext(SnackBarContext);
    const {
        openSnackbar
    } = snackbarContext;


    //--------------------------------------------------CARROUSEL------------------------------
    //sube multiples imagenes del carrouserl
    const postMultipleImage = async (file) => {
        try {
            const result = await service.multiUpdatFiles(file)
            openSnackbar(result.data, "success")
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    // obtener las multiples imagenes del carrousel
    const getMultipleImages = async () => {
        try {
            const result = await service.getMultiUpdaterFiles()
            dispatch({
                type: UPLOADER_MULTIPPLE_IMAGES,
                payload: result.data
            });
        } catch (error) {
            throw error
        }
    };
    // elimina una imangen del carrousel
    const deleteImage = async (idArray, idImage) => {
        try {
            const result = await service.deleteImage(idArray, idImage)
            openSnackbar(result.data.msg, "success")
        } catch (error) {
            throw error
        }
    };

    return (
        <FileContext.Provider
            value={{
                images: state.images,
                postMultipleImage,
                getMultipleImages,
                deleteImage,
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
}

export default FileState;