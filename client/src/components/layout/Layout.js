import React from 'react';
import Footer from "../footer/Footer";
import Navbar from '../navbar/Navbar';
import Scroll from '../scroll/Scroll';

const Layout = ({ children }) => {
  return <>
    <Navbar />
    {children}
    <Scroll showBelow={250} />
    <Footer />
  </>
}

export default Layout