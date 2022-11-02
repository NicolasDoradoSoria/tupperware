import React, {forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from '@material-ui/core/Slide';
import Style from "./Style";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const reusableDialog = ({ open, onClose, children }) => {
  const classes = Style();
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md"  onClose={onClose}  TransitionComponent={Transition} fullWidth className={classes.dialog}>
      {children}
    </Dialog>
  );
}; 

export default reusableDialog;

