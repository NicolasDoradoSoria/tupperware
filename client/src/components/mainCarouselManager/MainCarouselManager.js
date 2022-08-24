import React, { useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from "@material-ui/core";
import Style from "./Style";
import BackupIcon from '@material-ui/icons/Backup';
import FileContext from "../../context/fileContext/FileContext";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import SnackbarOpen from "../snackbar/SnackBar";

// en este componente administro el carroulse 
// puedo agregar o quitar imagenes
const MainCarrouselManager = () => {
    const classes = Style();

    //fileContext
    const fileContext = useContext(FileContext);
    const { postMultipleImage, images, deleteImage, getMultipleImages } = fileContext;

    // context Snakbar
    const snackbarContext = useContext(SnackBarContext)
    const { error } = snackbarContext

    //hooks
    const [selectImage, setSelectImage] = useState({
        selectedImageId: "",
        imageSelectedFromArray: ""
    })

    // eliminar una imagen del carrousel 
    const deleteFileButton = () => {
        deleteImage(selectImage.imageSelectedFromArray, selectImage.selectedImageId)
    }

    // manda la lista de imagenes del carrousel al context
    const imageCarrouselChange = async (e) => {
        const files = e.target.files
        let images = []
        Array.from(files).forEach(file => {
            file.fileName = URL.createObjectURL(file)
            images.push(file)
        })

        postMultipleImage(images)
    }

    //selecciona una imagen del carrousel haciendo click
    const selectImageCarrouselClick = (e, img, idArray) => {
        setSelectImage({
            [e.currentTarget.id]: idArray,
            [e.currentTarget.name]: img._id
        })
        
    }

    useEffect(() => {
        getMultipleImages()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);
    return (
        <>
            <Box className={classes.root}>


                <Paper component="form" className={classes.paperUploadedPhoto}>
                    <Typography variant="h4" component="h2" align="center" >
                        Agregar imagenes del Carrousel
                    </Typography>
                    <Grid item xs={12} className={classes.gridTextarea}>

                        {/* BOTON SUBIR IMAGEN */}
                        <div className={classes.buttonDeleteImage}>
                            <div>
                                <label htmlFor="file">
                                    <BackupIcon style={{ fontSize: 90, cursor: "pointer" }} />
                                </label>
                                <input
                                    multiple
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={imageCarrouselChange}
                                    className={classes.img}
                                />
                            </div>

                            {/* BOTON ELIMINAR IMAGEN */}
                            <Button variant="contained" onClick={deleteFileButton} >Eliminar</Button>
                        </div>

                        {/* MOSTRAR IMAGEN */}
                        {
                            images.length ?
                                <div className={classes.divUploaderImage}>
                                    {
                                        images.map((imageGroup) =>
                                            imageGroup.files.map((image) =>
                                                <div key={image._id}>

                                                    <Button onClick={(e) => selectImageCarrouselClick(e, image, imageGroup._id)} name="selectedImageId" id="imageSelectedFromArray" className={(selectImage.selectedImageId === image._id) ? classes.textImg : null} >

                                                        <img src={`http://localhost:4000/${image.fileName}`} alt="uploaded_image" width="130" height="130" />
                                                    </Button>
                                                </div>
                                            )

                                        )}
                                </div>
                                : null
                        }
                    </Grid>
                </Paper>

            </Box>
            {error ? <SnackbarOpen /> : null}
        </>
    );
}

export default MainCarrouselManager;