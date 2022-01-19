import React from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Scroll from '../scroll/Scroll';

const Layout = ({ children }) => {
  return <>
    <Header />
    {children}
    <Scroll showBelow={250} /> 
    <Footer />
  </>
}

export default Layout