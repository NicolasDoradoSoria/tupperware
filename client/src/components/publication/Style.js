import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  rootDialog: {
    marginTop: 50,
    marginBottom: 59,
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
  },
  right_img_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  left_img: {
    width: "auto",
    height: 60,
    cursor: "pointer",
    margin: 15,
  },
 
  right_img: {
    height: 520,
    maxWidth: 480,
    overflow: 'hidden',
    display: 'blox',
    width: '100%',
   
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
  },
   // grid Principal izquerdo 
  // grid interior derecho
  left_1: {
    order: 2,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up('md')]: {
      order: 1,
      flexDirection: "column",
    },
  },
   // grid Principal izquerdo 
  // grid interior izquierdo
  right_1: {
    order: 1,
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },

  linksConteiner: {
    marginLeft: 20,
    fontSize: 20,
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "none",
      color: "#bdbdbd"
    }
  },
  carousel: {
    maxWidth: 400,
    flexGrow: 1,
  },
  // grid principal derecho
  leftMainGrid: {
    [theme.breakpoints.up('md')]: {
      display: "flex",
      flexDirection: "column",
    },
  },
// grid principal izquierdo
  rightMainGrid: {
    marginLeft: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
      height: "25vh"
    },
  },

  gridBotones: {
    display: "flex"
  },
  loginButtonAndCount: {
    width: "96%",
    height: "3.5rem"
  },
  buttonsConteiner: {
    width: "12rem",
    height: "3.5rem",
    border: "none"
  },
  MobileStepper: {
    background: "rgb(205, 166, 194)"
  },
  offer: {
    textDecoration: "line-through",
  }
}));