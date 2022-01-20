import { makeStyles, useTheme } from "@material-ui/core/styles";

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
  },

  root: {
    flexGrow: 1,
    margin: "auto"
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
}));
