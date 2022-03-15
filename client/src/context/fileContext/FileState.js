import React, { useReducer } from 'react';
import FileContext from "./FileContext";
import FileReducer from "./FileReducer";
import Service from "../../service/Service"
import {
    UPLOADER_MULTIPPLE_IMAGES,
    UPLOADER_MULTIPPLE_POST_IMAGES
} from "../../types";

const FileState = (props) => {
    const service = new Service()
    const initialState = {
        images: [],
        postImage: []
    };

    const [state, dispatch] = useReducer(FileReducer, initialState);

    //--------------------------------------------------CARROUSEL------------------------------
    //sube multiples imagenes del carrouserl
    const postMultipleImage = async (file) => {
        try {
            await service.multiUpdatFiles(file)

        } catch (error) {
            console.log(error)
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
          await service.deleteImage(idArray, idImage)
            
        } catch (error) {
            throw error
        }
      };
    

    //----------------------------------------------------PUBLICATION-------------------------------------------
  
    //sube multiples imagenes del carrouserl
    const postMultiplePostImages = async (file) => {
        try {
            await service.postMultiPostImages(file)

        } catch (error) {
            console.log(error)
        }
    }

    // obtener las multiples imagenes de la publicacion del producto
    const getMultiplePostImages = async () => {
        try {
            const result = await service.getMultiPostFiles()
            dispatch({
                type: UPLOADER_MULTIPPLE_POST_IMAGES,
                payload: result.data
            });
        } catch (error) {
            throw error
        }
    };
    return (
        <FileContext.Provider
            value={{
                images: state.images,
                postImage : state.postImage,
                postMultipleImage,
                getMultipleImages,
                deleteImage,
                postMultiplePostImages,
                getMultiplePostImages
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
}

export default FileState;