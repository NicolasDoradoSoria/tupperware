import { makeStyles } from "@material-ui/core/styles";
// shoppingCart
export default makeStyles((theme) => ({

  // box main
  root: {
    height: '100vh',
    marginBottom: "12rem",
    margin: "5rem 2rem"
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },

  paperContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "3.3rem",
    width: "65%",
    flexDirection: "row",
    [theme.breakpoints.only('xs')]: {
      flexDirection: "column",
     margin: "0 auto"
    },
  },

}));