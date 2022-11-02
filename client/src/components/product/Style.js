import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 545,
    backgroundColor: "#FEF7E4",
    boxShadow: "none",
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    cursor: "pointer"

  },
  cardMediaContainer: {
    position: "relative",
  },
  quickViewButton: {
    position: "absolute",
    maxWidth: '150px',
    borderRadius: 5,
    padding: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      right: 150,
      bottom: 110,
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 120,
      right: 170,
    },
    [theme.breakpoints.up('md')]: {
      bottom: 80,
      right: 100,
    },

    [theme.breakpoints.up('lg')]: {
      bottom: 60,
      right: 70,
    },
    [theme.breakpoints.up('xl')]: {
      bottom: 100,
      right: 145,
    },
  },
  title: {
    textAlign: "center",
    color: "#000000",
    marginTop: "2rem",
    marginBottom: "0"
  },
  price: {
    color: "#EC1B1B",
    textAlign: "center",
    marginBottom: "1rem"
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "30%",
    borderRadius: 5,
    margin: "0 auto"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));