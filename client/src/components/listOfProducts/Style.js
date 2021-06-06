import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  products: {
      marginTop:20,
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
      padding: "3rem" ,
  },
  paperPagination: {
    marginTop: "2rem"
  }
    
}));