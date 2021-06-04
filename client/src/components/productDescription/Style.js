import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    image: {
      width: "auto",
      maxHeight: "30rem"
    },
    descripcion: {
      marginLeft: "2rem",
      marginBottom: "3rem"
    },
    name: {
      textAlign: "center"
    },
    
    paperQuantity: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      width: "30%"
    }
  }));