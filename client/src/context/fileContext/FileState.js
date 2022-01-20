import React, { useReducer } from 'react';
import FileContext from "./FileContext";
import FileReducer from "./FileReducer";
import Service from "../../service/Service"
import {
    UPLOADER_MULTIPPLE_IMAGES,
} from "../../types";

const FileState = (props) => {
    const service = new Service()
    const initialState = {
        images: [],
    };

    const [state, dispatch] = useReducer(FileReducer, initialState);


    //sube multiples imagenes
    const postMultipleImage = async (file) => {
        try {
            await service.multiUpdatFiles(file)

        } catch (error) {
            console.log(error)
        }
    }

    // obtener los pedido del user
    const getMultipleImages = async (userId) => {
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

    const deleteImage = async (idArray, idImage) => {
        try {
          await service.deleteImage(idArray, idImage)
        
    
        } catch (error) {
            throw error
        }
      };
    

    //muestra las imagenes
    return (
        <FileContext.Provider
            value={{
                images: state.images,
                postMultipleImage,
                getMultipleImages,
                deleteImage
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
}

export default FileState;