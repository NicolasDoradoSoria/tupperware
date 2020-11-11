import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
      maxWidth: 385,
      maxHeight: 480,
      margin: 10,
      
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
   
  }));