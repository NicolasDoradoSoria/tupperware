import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "95%",
    margin: "7rem auto"
  },
  title:{
    textAlign: "center",
    margin: "3rem 0"
  },
  buttonConteiner: {
    margin: "auto 0"
  },
  mainContainer: {
    marginBottom: "2rem"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
