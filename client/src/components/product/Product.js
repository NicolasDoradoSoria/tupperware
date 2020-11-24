import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Card from "@material-ui/core/Card";
import "./Style.css";
import Style from "./Style";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  const classes = Style();

  const { name, descripcion, date, photoURL } = product;
  return (
    <div className="card">
      <Card className={classes.root}>
        <Link
          to="/main/descripcion-producto"
          style={{ textDecoration: "none" }}
        >
          <CardHeader title={name} subheader={date} />
        </Link>
        <CardMedia
          className={classes.media}
          image={photoURL}
          title="Paella dish"
        />
        <Link
          to="/main/descripcion-producto"
          style={{ textDecoration: "none" }}
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {descripcion}
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

          <IconButton>
            <Button variant="contained" color="primary">
              agregar carrito
            </Button>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
