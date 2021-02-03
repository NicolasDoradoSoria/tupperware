/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useContext } from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Style from "./Style";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserContext from "../../context/productsContext/userContext/UserContext";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DraWer() {
  const classes = Style();
  const [drawer, setDrawer] = useState(false);
  //userContext
  const userContext = useContext(UserContext);
  const { signOff, user } = userContext;

  const routes = [
    {
      id: 1,
      name: "perfil",
      path: "perfil",
      icon: PersonIcon,
    },
    {
      id: 2,
      name: "carrito",
      path: "/main/carrito",
      icon: AddShoppingCartIcon,
    },
    {
      id: 3,
      name: "Categoria",
      path: "/main/categoria",
      icon: CategoryIcon,
    },
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const onCLickSignOff = () => {
    signOff();
  };

  var list = (
    <List onClick={toggleDrawer(false)}>
      {routes.map((route, key) => {
        return (
          <NavLink to={route.path} activeClassName="active" key={key}>
            <ListItem button className={classes.itemLink}>
              <route.icon className={classNames(classes.itemIcon)} />
              <ListItemText
                primary={route.name}
                className={classNames(classes.itemText)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <Link
        to={`/`}
        className={classNames(classes.logoLink)}
        style={{ textDecoration: "none" }}
        onClick={toggleDrawer(false)}
      >
        TUPPERWARE
      </Link>

      <div className={classNames(classes.logoName)}>
        {user ? <div>Hola {user.user.firstName}</div> : null}
      </div>
    </div>
  );
  if (user === null) return null
  return (
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
      <Drawer
        open={drawer}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        {brand}

        <div className={classes.sidebarWrapper}>
          {list}

          <List>
            {user.roles.map((role, key) => {
              if (role.name === "moderator") {
                return (
                  <NavLink to="Administracion-productos" activeClassName="active" key={key}>
                    <ListItem button className={classes.itemLink}>
                      <CategoryIcon className={classNames(classes.itemIcon)} />
                      <ListItemText
                        primary="Administracion de Productos"
                        className={classNames(classes.itemText)}
                        disableTypography={true}
                      />
                    </ListItem>
                  </NavLink>
                );
              }
            })}
          </List>

          <ListItem button className={classes.itemLink}>
            <ExitToAppIcon className={classNames(classes.itemIcon)} />
            <ListItemText
              onClick={onCLickSignOff}
              className={classNames(classes.itemText)}
              disableTypography={true}
            >
              Cerrar Sesion
            </ListItemText>
          </ListItem>
        </div>
      </Drawer>
    </Fragment>
  );
}
