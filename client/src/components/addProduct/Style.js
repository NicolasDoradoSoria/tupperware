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
    marginLeft: "3rem",
    display: "flex",
    justifyContent: "center",
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
    [theme.breakpoints.up('sm')]: {
      width: "100%",
    },
    [theme.breakpoints.up('xs')]: {
      width: "100%",
    },
    [theme.breakpoints.up('md')]: {
      width: "30%"
    },
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
      marginLeft: "1rem",
    },
    [theme.breakpoints.up('xs')]: {
      flexDirection: "column",
      marginLeft: "0.8rem",
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
  },
  textImg: {
    opacity: "0.3",
  },
  uploadImages: {
    marginTop: "1.5rem"
  },
 
  gridConteiner: {
    display: 'flex',
    justifyContent: "space-between",
  },
  
  textFieldImage: {
    minWidth: "140px",
    width: "140px",
    marginBottom: "1rem",
    marginLeft: "-1rem"
  },

  gridConteinerImageAndStock: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up('xs')]: {
      flexDirection: "column",
      alignItems: "center"
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: "row",
    },
    gridImageAndStock: {
      width: "70%"
    }
  },

  
}));
