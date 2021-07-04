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
  main: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',   
    marginTop: "1rem",
    marginBottom: "1rem",
    height: '150vh',
    [theme.breakpoints.down('sm')]: {
      height: '200vh',
    },
  },
  container: {
    backgroundColor: "#E2E8E7",
    height: '140vh',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '200vh',
      marginTop: "1rem",
      marginBottom: "1rem"
    },
  },
  fonds: {
    width: theme.spacing(100),
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem"
  },
  dni: {
    [theme.breakpoints.down('sm')]: {
     marginLeft: "1rem",
     marginTop: "-2rem"
    },
  },
  gener: {
    [theme.breakpoints.down('sm')]: {
      marginTop: "1rem"
     },
  }
}));