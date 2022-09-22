import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  products: {
    marginTop: 20,
  
  },
  gridProducts: {
    display: "flex",
    justifyContent: "center",
    
  },
  conteinerProducts: {
    width: "100%",
  },
  root: {
    margin: "0 auto",
    padding: "3rem", 
    maxWidth: "100%",
 
    [theme.breakpoints.up('xs')]: {
      marginRight: "auto",
      marginLeft: -38,
      minWidth: "31rem",
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "100%",
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "75%",
    },
  },
  paperPagination: {
    marginTop: "2rem"
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    marginTop: "1rem"
  },
  logo: {
    margin: "5rem auto",
    display: "block",
    width: "30%",
  },
  logoContainer: {
  },
  rootNavigation: {
    width: "80%",
    margin: "50px auto",
    display: "flex",
    justifyContent: "space-between",
  },
  bottomNavigationAction: {
    display: "flex",
    justifyContent: "space-between"
  },
}));