import React from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navbar from '../navbar/Navbar';
import Scroll from '../scroll/Scroll';

const Layout = ({ children }) => {
  return <>
    <Navbar />
    {/* <Header /> */}
    {children}
    <Scroll showBelow={250} />
    <Footer />
  </>
}

export default Layout