import { makeStyles } from "@material-ui/core/styles";
// shoppingCart
export default makeStyles((theme) => ({

  // box main
  root: {
    height: '100vh',
    margin: "8rem 2rem",
    width: "100%"
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
  containerGrid: {
    margin: "0 auto",
    backgroundColor: "#E4BCD9",
    borderRadius: "10px",
    display: "flex",
  },
  buttonQuantity: {
    height: 40,
  },
  quantity: {
    width: 100,
    margin: "0 1rem 1rem 1rem"
  },
  centerGridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center"
  },
  rightGridContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "1rem",
  },
  leftGridContainer: {
    textAlign: "center"
  },
  shoppingCartContainer: {
    display: "flex",
    alignItems: "center"
  },
  abstract: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#E4BCD9",
    margin: "auto 1rem",
    borderRadius: "10px",

  },
  img: {
    height: 150,
    width: 150,
    border: "3",
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  disabledButton: {
    backgroundColor: theme.palette.secondary || 'red'
  }
}));