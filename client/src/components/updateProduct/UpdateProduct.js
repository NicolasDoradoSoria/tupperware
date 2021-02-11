import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AddProduct from '../addProduct/AddProduct'

const UpdateProduct = ({ open, onClose }) => {

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md" onClose={onClose}>
      <AddProduct onClose={onClose} open={open}/>
    </Dialog>
  );
};

export default UpdateProduct;
