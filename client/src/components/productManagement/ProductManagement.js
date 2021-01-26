import React from 'react';
import AddProduct from '../addProduct/AddProduct';
import RemoveProduct from '../removeProduct/RemoveProduct';
import UpdateProduct from '../updateProduct/UpdateProduct';

const ProductManagement = () => {
    return ( 
        <>
        <AddProduct />
        <RemoveProduct />
        <UpdateProduct />
        </>
     );
}
 
export default ProductManagement;