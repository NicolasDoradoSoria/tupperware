import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Card from "@material-ui/core/Card";
import Style from "./Style";
import { Link } from "react-router-dom";
function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

const Product = ({ product }) => {
  const classes = Style();

  const { name, descripcion, date, photoURL, price, _id } = product;

  return (
    <Card className={classes.root}>
      <Link
        to={`/main/descripcion-producto/${_id}`}
        style={{ textDecoration: "none" }}
      >
        <h1 className={classes.title}>{name}</h1>
        <CardHeader
          subheader={convertDate(date)}
          className={classes.subheader}
        />
      </Link>
      {photoURL ? (<CardMedia
        className={classes.media}
        image={`http://localhost:4000/${photoURL}`}
        title="Paella dish"
      />) : null } 
      <Link
        to={`/main/descripcion-producto/${_id}`}
        style={{ textDecoration: "none" }}
      >
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {descripcion}
          </Typography>

          <Typography variant="h5" component="h2" className={classes.price}>
            ${price}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
};

export default Product;
