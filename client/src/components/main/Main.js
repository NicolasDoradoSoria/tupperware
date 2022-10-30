import React, { useContext, useEffect } from 'react'
import Carousel from "../carousel/Carousel";
import ListOfProducts from '../listOfProducts/ListOfProducts';
import logo from './logo.JPG';
import Style from "./Style";
import CartContext from '../../context/cartContext/CartContext';
import UserContext from '../../context/userContext/UserContext';
import CategoryContext from '../../context/categoryContext/CategoryContext';
const Main = () => {

    const classes = Style();

    //cartContext
    const cartContext = useContext(CartContext)
    const { getOrder } = cartContext

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //CategoryContext
    const categoryContext = useContext(CategoryContext)
    const { getCategory } = categoryContext


    useEffect(() => {
        getCategory()
        if (user) {
            getOrder(user.user._id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            <img src={logo} alt="" className={classes.logo} />
            <Carousel />
            <ListOfProducts />
        </>

    );
}

export default Main;