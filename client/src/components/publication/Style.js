import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    marginTop: 200,
    marginBottom: 200,

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

  images: {
    width: "auto",
    height: 60,
    cursor: "pointer"
  },
  images_2: {
    width: "auto",
    height: 350,
  },
  left_1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up('xs')]: {
      order: 2
    },
    [theme.breakpoints.up('sm')]: {
      order: 2
    },
    [theme.breakpoints.up('md')]: {
      order: 1
    },
  },
  Right_1:{
    [theme.breakpoints.up('xs')]: {
      order: 1
    },
    [theme.breakpoints.up('sm')]: {
      order: 1
    },
    [theme.breakpoints.up('md')]: {
      order: 2
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
  img_wrap: {
    margin: 15
  },
  carousel: {
    maxWidth: 400,
    flexGrow: 1,
  },
  leftMainGrid: {
    display: "flex",
  },
  rightMainGrid: {
    marginLeft: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  }
}));