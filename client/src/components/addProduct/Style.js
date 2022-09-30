import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    minWidth: 330,
    width: "95%",
    margin: "5rem auto"
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  addProductButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem"
  },
 
  imageContainer: {
    display: "flex",
    margin: "0 auto",
    flexDirection: "column",
    alignItems: "center",
   
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
  },

  textImg: {
    opacity: "0.3",
  },

  gridImageProduct: {
    width: "50%",
  },
  imgProduct: {
    width: "100%",
    maxWidth: "300px",
    height: "auto"
  },
  productImageButton: {
    marginLeft: "2rem"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },

  gridElements: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up('xs')]: {
      display: "flex",
      justifyContent: "center"
    },
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "center"
  },
  stockGrid: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10ch',
    },
  }
}));
