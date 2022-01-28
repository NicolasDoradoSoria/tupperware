import React, { useContext, useEffect } from 'react';
import Carousel from "react-material-ui-carousel"
import './Styles.css';
import Style from "./Style";

import {
    Card,
    CardMedia,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';

//context
import FileContext from "../../context/fileContext/FileContext";

function Banner({ image }) {
    const classes = Style();
    const totalItems = image.length ? image.length : 3;

    const handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight / 3, behavior: `smooth` })
    }
    return (
          image.files.map((itemIndividual) => {
                return <Grid item key={itemIndividual._id} className="Media">
                    <CardMedia
                        image={`http://localhost:4000/${itemIndividual.fileName}`}
                    // title={itemIndividual.fileName}
                    >
                        <Typography className="MediaCaption">
                            {/* {itemIndividual.fileName} */}
                        </Typography>
                        <div className={classes.productsDiv}>
                            <Button variant="contained" className={classes.productsButton} color="secondary" onClick={handleClick}>
                                Ver Productos
                            </Button>
                        </div>
                    </CardMedia>
                </Grid>
            })

    )

    //  return (
    //     <Card raised className="Banner">
    //         <Grid container spacing={0} className="BannerGrid">
    //             <Grid item xs={12} key={item.Name}>
    //                 <CardMedia
    //                     className="Media"
    //                     image={`http://localhost:4000/${item.fileName}`}
    //                     title={item.Name}
    //                 >
    //                     <Typography className="MediaCaption">
    //                         {item.Name}
    //                     </Typography>
    //                     <div className={classes.productsDiv}>
    //                         <Button variant="contained" className={classes.productsButton} color="secondary" onClick={handleClick}>
    //                             Ver Productos
    //                         </Button>
    //                     </div>
    //                 </CardMedia>
    //             </Grid>
    //         </Grid>
    //     </Card>
    //  )
}

const items = [
    {
        Name: "Macbook Pro",
        Caption: "Electrify your friends!",
        Image: "https://source.unsplash.com/featured/?macbook"

    },
    {
        Name: "iPhone",
        Caption: "Electrify your friends!",
        Image: "https://source.unsplash.com/featured/?iphone"

    },
    {
        Name: "pc Pro",
        Caption: "Electrify your friends!",
        Image: "https://source.unsplash.com/featured/?macbook"

    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        Image: "https://source.unsplash.com/featured/?washingmachine"

    },
    {
        Name: "Decoratives",
        Caption: "Give style and color to your living room!",
        Image: "https://source.unsplash.com/featured/?lamp"

    }
]

const Carrousel = () => {
    const classes = Style();

    //fileContext
    const fileContext = useContext(FileContext);
    const { getMultipleImages, images } = fileContext;

    useEffect(() => {
        getMultipleImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);
    return (
        <div>
            <Carousel
                autoPlay={true}
                animation="fade"
                indicators={true}
                timeout={500}
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
            >
                <Card raised className="Banner">
                    <Grid item className="conteiner">
                        {
                            images.map((image, index) => {

                                return <Banner image={image} key={index} />
                            })
                        }
                    </Grid>
                </Card>
                {/* { 
                    items.map((item, index) => {
                        return <Banner item={item} key={index} />
                    })
                } */}
            </Carousel>
        </div >

    )

}

export default Carrousel;