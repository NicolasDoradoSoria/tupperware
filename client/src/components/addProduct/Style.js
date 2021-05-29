import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    minWidth: 330,
    marginLeft: "2rem",
    marginRight: "2rem",
    marginTop: "2rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },

  gridTextarea: {
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    display: "flex",
  },
  addProductButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem"
  },
  img: {
    marginLeft: "2rem",
    
  }
}));
