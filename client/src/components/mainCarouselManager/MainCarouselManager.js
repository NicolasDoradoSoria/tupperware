import React, { useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from "@material-ui/core";
import Style from "./Style";
import BackupIcon from '@material-ui/icons/Backup';
import FileContext from "../../context/fileContext/FileContext";

const MainCarouselManager = () => {
    const classes = Style();

    //fileContext
    const fileContext = useContext(FileContext);
    const { postMultipleImage, images, deleteImage, getMultipleImages } = fileContext;

    //hooks
    const [selectIdArrayImage, setSelectIdArrayImage] = useState("")
    const [selectImage, setSelectImage] = useState("")
    const [productImageChange, setProductImageChange] = useState(false)

    // eliminar una imagen del carrousel 
    const deleteFileButton = () => {

        deleteImage(selectIdArrayImage, selectImage)
        setProductImageChange(true)
    }

    // manda la lista de imagenes del carrousel al context
    const imageHandleCarrouselSumbmit = async (e) => {
        try {
            postMultipleImage(e.target.files)
            setProductImageChange(true)
        } catch (error) {
            console.log(error)
        }
    }

    //selecciona una imagen del carrousel haciendo click
    const selectImageCarrouselClick = (img, idArray) => {
        setSelectImage(img._id)
        setSelectIdArrayImage(idArray)
    }

    useEffect(() => {
        getMultipleImages()
        setProductImageChange(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productImageChange]);
    return (
        <>
            <Box className={classes.root}>

                <Paper component="form" className={classes.paperUploadedPhoto}>
                    <Typography variant="h4" component="h2" align="center" >
                        Agregar imagenes del Carrousel
                    </Typography>
                    <Grid item xs={12} className={classes.gridTextarea}>

                        <div className={classes.buttonDeleteImage}>
                            <div >
                                <label htmlFor="file">
                                    <BackupIcon style={{ fontSize: 90, cursor: "pointer" }} />
                                </label>
                                <input
                                    multiple
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={imageHandleCarrouselSumbmit}
                                    className={classes.img}
                                />
                            </div>
                            <Button variant="contained" onClick={deleteFileButton} >Eliminar</Button>
                        </div>
                        {
                            images.length ?
                                <div className={classes.divUploaderImage}>
                                    {
                                        images.map((imageGroup) =>
                                            imageGroup.files.map((image) =>
                                                <div key={image._id}>

                                                    <Button onClick={() => selectImageCarrouselClick(image, imageGroup._id)} name="img" className={(selectImage === image._id) ? classes.textImg : null} >

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

        </>
    );
}

export default MainCarouselManager;