import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddProduct from '../addProduct/AddProduct'
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const UpdateProduct = ({ open }) => {
  const classes = useStyles();

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md">
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <AddProduct />
    </Dialog>
  );
};

export default UpdateProduct;
