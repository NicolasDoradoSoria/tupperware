/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useContext,useEffect } from "react";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useLocation } from 'react-router-dom'
export default function DraWer() {
  const classes = Style();
  const [drawer, setDrawer] = useState(false);
  //userContext
  const userContext = useContext(UserContext);
  const {authenticated, signOff, user } = userContext;

  const location = useLocation();
  const [drawerLocation, setDrawerLocation] = useState("")

useEffect(() => {

  setDrawerLocation(location.pathname)
  


}, [location])
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

  function activeRoute(routeName) {
    return drawerLocation.indexOf(routeName) > -1 ? true : false;
  }
  var list = (
    <List>
      {routes.map((route, key) => {
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes["blue"]]: activeRoute(route.path),
        });


        return (
          <NavLink
            to={route.path}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
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
      <a
        href="#"
        className={classNames(classes.logoLink)}
        target="_blank"
      >
        TUPPERWARE
        
      </a>
      <div className={classNames(classes.logoName)}>

      {user? <div>Hola  {user.firstName}</div>: null}
      </div>
    </div>
  );
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
        >
          {brand}
          <div className={classes.sidebarWrapper}>{list}
            <ListItem button className={classes.itemLink}>
              <ListItemIcon className={classNames(classes.itemIcon)}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText className={classNames(classes.itemText)} onClick={onCLickSignOff}>
                Cerrar Sesion
              </ListItemText>
            </ListItem>
          </div>
          <div className={classes.background} />
        </Drawer>
      </Fragment>
  );
}
