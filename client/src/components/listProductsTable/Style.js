import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme =>({
    table: {
        minWidth: 650,
      },
      root: {
        marginTop: "3rem",
        width: "85%",
        margin: "auto",
      },
    column: {
          paddingLeft: 0,
    },
      title: {
          marginTop: "1rem",
          textAlign: "center",
          marginBottom: "2rem",
      },
      removeIcon: {
          marginRight: "1rem",
      },
      actionBox: {
        textAlign: "center",
        paddingRight: 0
      },
      columnAction: {
          width: "25%"
      }
}));