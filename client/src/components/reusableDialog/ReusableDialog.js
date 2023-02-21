import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const reusableDialog = ({ open, onClose, children }) => {
  return (
      <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md" onClose={onClose} TransitionComponent={Transition} fullWidth scroll="body">
        {children}
      </Dialog>
  );
};

export default reusableDialog;

