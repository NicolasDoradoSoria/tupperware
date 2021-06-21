import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },

  },
  container: {
    backgroundColor: "#E2E8E7",
    height: '115vh',
    marginTop: "1rem",
  },
  fonds: {
    width: theme.spacing(100),
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem"
  },
  
}));