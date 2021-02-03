import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme =>({
    table: {
        minWidth: 300,
        
      },
      root: {
        maxWidth: 700,
        // marginLeft: "4rem",
        marginTop: "2rem",
      },
      nameProducts: {
          display:"flex",
      },
      tableName: {
          paddingLeft: "0"
      },
      title: {
          textAlign: "center",
          marginBottom: "2rem",
      },
      removeIcon: {
          marginRight: "1rem",
      }
}));