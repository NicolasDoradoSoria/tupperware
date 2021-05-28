import React, { useState,useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarOpen() {
  const classes = useStyles();
  const [open, setOpen] = useState(true)

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const {msg, severity} = snackbarContext


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000}  onClose={handleClose}>
        <Alert  onClose={handleClose}  severity={severity} >{msg}</Alert>
      </Snackbar>
    </div>
  );
}