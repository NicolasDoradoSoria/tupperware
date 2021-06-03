import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    table: {
      minWidth: 650,
      justifyContent: "center"
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
    },
    paper: {
      padding: theme.spacing(1),
      margin: "1rem",
      display: "flex",
      justifyContent: "center",
    },
    paperTotal: {
      display: "flex",
      justifyContent: "flex-start",
      marginLeft: "3.3rem",
      width: "65%",
    },
    paperClean: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "3.3rem",
      width: "65%",
    },
    paperContainer: {
      display: "flex",
    },
    cleanButton: {
      marginLeft: "1rem",
    }
  }));