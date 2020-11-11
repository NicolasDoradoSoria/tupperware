import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(30),
        height: theme.spacing(30),
      },
    },
  
    fonds: {
      width: theme.spacing(100),
    },
  }));