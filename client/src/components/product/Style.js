import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 385,
    maxHeight: 350,
    height:350,
    margin: 10,
    borderRadius: 16,
    // '&:hover': {
    //   transform: 'scale(1.1)',
    // },
    backgroundColor: "#FEF7E4",
    border: "none",
    boxShadow: "none",
    // boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    // transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",

    [theme.breakpoints.up('xs')]: {
      margin: 5,
      height:250,
    },
    [theme.breakpoints.up('md')]: {
      height:300,
    },
    
    [theme.breakpoints.up('sm')]: {
      height:350,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  actionArea: {
    borderRadius: 16,

    '&:hover': {
      transform: 'scale(1.1)',
    },
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
    },
  },
  title: {
    textAlign: "center",
    color: "#000000",
    fontSize: "2.1rem",
    marginBottom: "0"
  },
  subheader: {
    textAlign: "right",
  },
  price: {
    color: "#EC1B1B",
    textAlign: "right",
    fontSize: "2rem",
  }
}));