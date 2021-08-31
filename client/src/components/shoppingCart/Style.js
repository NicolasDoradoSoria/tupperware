import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    table: {
      minWidth: 300,
      justifyContent: "center",
      [theme.breakpoints.up('xl')]: {
        width: 'auto',
      },
    },
    orderListNull: {
      marginTop: "1rem",
      textAlign: "center"
    },
    TableContainer: {
      width: '90%',
      margin: "auto",
    },
    body: {
      height: '100vh',
      marginBottom: "12rem"
    },
    paper: {
      padding: theme.spacing(1),
      margin: "1rem",
      display: "flex",
      justifyContent: "center",
    },
    paperTotal: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "3.3rem",
      width: "65%",
    },
    tableCellQuantity:{
      display:"flex",
      justifyContent: "center",
    },inBottom: "auto"
    
  }));