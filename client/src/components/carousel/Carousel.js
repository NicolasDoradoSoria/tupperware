import React from 'react';
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


function Banner({item}) {
    const classes = Style();


    const handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight / 3, behavior: `smooth` })
    }
   
    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                <Grid item xs={12} key={item.Name}>
                    <CardMedia
                        className="Media"
                        image={item.Image}
                        title={item.Name}
                    >
                        <Typography className="MediaCaption">
                            {item.Name}
                        </Typography>
                        <div className={classes.productsDiv}>
                            <Button variant="contained" className={classes.productsButton} color="secondary" onClick={handleClick}>
                                Ver Productos
                            </Button> 
                        </div>
                    </CardMedia>
                </Grid>
            </Grid>
        </Card>
    )
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
                {
                    items.map((item, index) => {
                        return <Banner item={item} key={index} />
                    })
                }
            </Carousel>
        </div>

    )

}

export default Carrousel;