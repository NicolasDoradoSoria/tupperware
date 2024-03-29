import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({

  root: {
    width: "90%",
    margin: "8rem auto"
  },
  
  addproductGrid: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%"
    },
    
  },
  ProductManagementBox: {
    boxShadow: "none",
    marginRight: "2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "-9px",
    }
  },

  ListProductsGrid: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "2rem",
      minWidth: 360,
      maxWidth: "100%",
      flexBasis: "100%"   
    }
  },
  orderContainerRoot: {
    margin: "2rem 1rem"
  },
  deleteOrder: {
    marginTop: "2rem"
  }

}));
