import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    imgSlideshow: {
        [theme.breakpoints.up('xs')]: {
            height: "200px",
          },
          [theme.breakpoints.up('md')]: {
            height: "500px",
          },

    }

  }));
