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


function Banner(props) {
    const classes = Style();
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems;

    let items = [];
    
    const handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight/3, behavior: `smooth` })
    }
    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                    <div className={classes.productsDiv}>
                    {i=== 1 ?<Button variant="contained" className={classes.productsButton} color="secondary" onClick={handleClick}>
                        Ver Productos
                    </Button> : null}
                    </div>
                </CardMedia>
            </Grid>
        )

        items.push(media);
    }
    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Electronics",
        Caption: "Electrify your friends!",
        contentPosition: "left",
        Items: [
            {
                Name: "Macbook Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
            {
                Name: "iPhone",
                Image: "https://source.unsplash.com/featured/?iphone"
            },
            {
                Name: "pc Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
        ]
    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        contentPosition: "middle",
        Items: [
            {
                Name: "Washing Machine WX9102",
                Image: "https://source.unsplash.com/featured/?washingmachine"
            },
            {
                Name: "Learus Vacuum Cleaner",
                Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
            },
            {
                Name: "pc Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
        ]
    },
    {
        Name: "Decoratives",
        Caption: "Give style and color to your living room!",
        contentPosition: "right",
        Items: [
            {
                Name: "Living Room Lamp",
                Image: "https://source.unsplash.com/featured/?lamp"
            },
            {
                Name: "Floral Vase",
                Image: "https://source.unsplash.com/featured/?vase"
            },
            {
                Name: "pc Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
        ]
    }
]

const Carrousel = () => {

    return (
        <div style={{ marginTop: "50px", color: "#494949" }}>

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
                        return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                    })
                }
            </Carousel>

        </div>

    )

}

export default Carrousel;