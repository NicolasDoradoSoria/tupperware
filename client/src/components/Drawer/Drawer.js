import React, { Fragment, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Style from "./Style";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
export default function DraWer() {
  const classes = Style();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "left" === "top" || "left" === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon style={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText>
            <Link to={"perfil"}>perfil</Link>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddShoppingCartIcon style={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText><Link to={"/main/carrito"}>Carrito</Link></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon style={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText>
            <Link to={"/main/categoria"}>Categoria</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon style={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText>Cerrar Sesion</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Fragment>
        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={drawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Fragment>
    </div>
  );
}
