import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  products: {
    marginTop: 20,
    minWidth: "16rem"
  },
  gridProducts: {
    display: "flex",
    justifyContent: "center",
  },
  boxProducts: {
    backgroundColor: "#CCC6C4",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  root: {
    maxWidth: "75%",
    margin: "0 auto",
    padding: "3rem",
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
    display: "block",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    width: "30%",
  },
  rootNavigation: {
    width: "80%",
    margin: "50px auto",
    display: "flex",
    justifyContent: "space-between",

    // [theme.breakpoints.up('sm')]: {
    //   width: "2",
    // },
  },
  bottomNavigationAction: {
    display: "flex",
    justifyContent: "space-between"
  }
}));