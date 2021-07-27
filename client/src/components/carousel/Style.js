import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  productsDiv: {
    display: "flex",
    alignItems:"flex-end",
    justifyContent: "center",
    height: "100%",
  },
  productsButton: {
    color: "white",
    fontSize: "header-font-size",
    border: "3px solid white",
    textTransform: "capitalize",
    transition: "200ms",
    marginBottom: "5rem",
    padding: "1rem 2rem 1rem 2rem"
  }
}));
