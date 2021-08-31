import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    minWidth: 330,
    marginLeft: "2rem",
    marginRight: "2rem",
    marginTop: "2rem",
    marginBottom: "2rem"
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
    justifyContent: "space-around",
  },
  addProductButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem"
  },
  img: {
    marginLeft: "2rem",
    display: "none"
  },
  textFieldQuantity: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: "30%"
  },
  TextFieldStock: {
    marginLeft: "1rem",
    marginBottom: "-1rem",
    display: "flex",
    flexDirection: "column"
  },
  paperUploadedPhoto: {
      margin: "auto",
      [theme.breakpoints.up('sm')]: {
        width: '30%',
      },
      [theme.breakpoints.up('xs')]: {
        width: '70%',
      },
      [theme.breakpoints.up('md')]: {
        width: '85%',
      },
  },
  imgUploaderImage: {
    border: "3px solid gray",
    margin: "0.3rem",
    [theme.breakpoints.up('sm')]: {
      width: '50',
    },
    [theme.breakpoints.up('xs')]: {
      width: '80',
    },
    [theme.breakpoints.up('md')]: {
      width: '120',
    },
  },
  divUploaderImage: {
    display: "flex",
    [theme.breakpoints.up('sm')]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up('xs')]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
  },
  textImg: {
    opacity: "0.3",
  }

  
}));
