import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  icon: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    color: "#fff",
  },
  root: {
    background: "linear-gradient(90deg, rgb(205, 166, 194) 0%, rgb(26, 23, 23) 100%)",
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2rem",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "end",
    },
  },
  button: {
    backgroundColor: "#8E7587",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "#B05CAB",
    },
    
  },
  dropdownItem: {
    background: "#1888ff",
    "&:hover": {
      background: "#5cabff"
    },
  },
}))