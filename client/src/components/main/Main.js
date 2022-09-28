import React, { useContext, useEffect } from 'react'
import Carousel from "../carousel/Carousel";
import ListOfProducts from '../listOfProducts/ListOfProducts';
import logo from './logo.JPG';
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import CartContext from '../../context/cartContext/CartContext';
import UserContext from '../../context/productsContext/userContext/UserContext';
import CategoryContext from '../../context/categoryContext/CategoryContext';
const Main = () => {
   
    const classes = Style();
    //context products
    const productsContext = useContext(ProductContext);
    const { getProducts } = productsContext;

    //cartContext
    const cartContext = useContext(CartContext)
    const { getOrder } = cartContext

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

  //CategoryContext
  const categoryContext = useContext(CategoryContext)
  const { getCategory, cleanCategory } = categoryContext


    useEffect(() => {
        getProducts()
        cleanCategory()
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