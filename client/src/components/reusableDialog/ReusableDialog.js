import React from "react";
import Dialog from "@material-ui/core/Dialog";

const reusableDialog = ({ open, onClose, children }) => {

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="md" onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default reusableDialog;

