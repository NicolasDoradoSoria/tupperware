import React from 'react'
import Carousel from "../carousel/Carousel";
import ListOfProducts from '../listOfProducts/ListOfProducts';
import logo from './logo.JPG';
import Style from "./Style";
const Main = () => {
    const classes = Style();
    return (
        <>
            <img src={logo} alt="" className={classes.logo} />
            <Carousel />
            <ListOfProducts />
        </>

    );
}

export default Main;