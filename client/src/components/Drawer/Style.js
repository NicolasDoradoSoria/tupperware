import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  
  // -------
  // login

  linkButton: {
    width: 200,
    margin: "1rem",
  },

  // Lista de usuario y admin
  paper: {
    background: "#B05CAB",
    opacity: 0.6
  },

  loginButton: {
    margin: "1rem auto",
    padding: "10px 15px",
    transition: "all 300ms linear",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    backgroundColor: 'transparent',
    "&:hover": {
      backgroundColor: "#B23A17",
    },
  },

  // lista completa
  list: {
    margin: "0.8rem auto",
    height:"30%",
    transition: "all 300ms linear",
    borderRadius: "3px",
    padding: "10px 15px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",

  },
  // hover de la lista esta echo asi para que la categoria no se pinte cuando se alla desplegado el submenu
  listHover: {
    "&:hover": {
      backgroundColor: "#B23A17",
    },
  },
  categoryList: {
    margin: "1.5rem 0",
    left: "4rem",
  },
  // iconos de la lista
  itemIcon: {
    width: "24px",
    height: "30px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#fff"
  },
  
  //  ListItemText 
  itemText: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    margin: "0",
    fontSize: "18px",
    color: "#fff",
  },

  // categoria
  categoryContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },

  // icono de flecha
  arrowIcon: {
    width: 120,
    display: "flex",
    justifyContent: "flex-end"
  },
  // titulo
  title: {
    color: "white",
    fontSize: "20px",
    textAlign: "center"
  },
  // div de titlo
  logoConteiner: {
    position: "relative",
    padding: "15px 15px",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
    }
  },
// link logo
  logoLink: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "center",
    "&,&:hover": {
      color: "#fff",
    }
  },
});

