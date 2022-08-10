import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 385,
    maxHeight: 370,
    height:350,
    margin: 10,
    borderRadius: 16,
    backgroundColor: "#FEF7E4",
    border: "#AB9F9F 1px solid",
    boxShadow: "none",
    [theme.breakpoints.up('xs')]: {
      margin: 5,
      height:250,
    },
    [theme.breakpoints.up('md')]: {
      height:100,
    },
    
    [theme.breakpoints.up('sm')]: {
      height:370,
    },
  },
  media: {
    marginTop: 5,
    width: "75%",
    margin: "auto",
    paddingTop: "56.25%", // 16:9
  },
  
  title: {
    textAlign: "center",
    color: "#000000",
    fontSize: "2.1rem",
    marginBottom: "0"
  },
  price: {
    color: "#EC1B1B",
    textAlign: "right",
    fontSize: "2rem",
  },
  content:{
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    width: "30%",
    borderRadius: 16,
  }
}));