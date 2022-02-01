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
      backgroundColor: "#CDA6C2"

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
    paperStock: {
      padding: theme.spacing(1),
      marginLeft: "1rem",
      textAlign: "center",

    },
    paperColor: {
      backgroundColor: "red"
    }
  }));