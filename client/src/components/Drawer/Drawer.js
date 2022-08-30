import React, { useState, useContext } from "react";
import classNames from "classnames";
import Style from "./Style";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserContext from "../../context/productsContext/userContext/UserContext";
import { Link, NavLink } from "react-router-dom";
import { Menu as MenuMaterial } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Button, MenuItem ,IconButton, ListItemText, ListItem,List, Drawer } from "@material-ui/core";
const adminUserPath = [
  {
    id: 1,
    name: "Lista de Productos",
    path: "todos-Productos",
    icon: CategoryIcon,
  },
  {
    id: 2,
    name: "Agregar Producto",
    path: "agregar-producto",
    icon: CategoryIcon,
  },
  {
    id: 3,
    name: "Administrador Carrousel Principal",
    path: "administrador-Carrusel-Principal",
    icon: CategoryIcon,
  },
];

const plainUserPath = [
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


export default function DraWer() {
  const classes = Style();
  const [drawer, setDrawer] = useState(false);

  //userContext
  const userContext = useContext(UserContext);
  const { authenticated } = userContext;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };


  return (
    <>
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
        {authenticated ? <Menu toggleDrawer={toggleDrawer} />
          : (
            <div className={classes.sidebarWrapper}>

              <Link to={"/login"} >
                <div className={classes.linkButton}>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={toggleDrawer(false)}
                    className={classes.itemLink}
                  >
                    Iniciar Secion
                  </Button>
                </div>
              </Link>
            </div>
          )}
      </Drawer>
    </>
  );
}



const Menu = ({ toggleDrawer }) => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { signOff, user } = userContext;

  //hooks
  const [anchorEl, setAnchorEl] = useState(null);


  const onCLickSignOff = () => {
    signOff();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const routeList = (routes) => {

    return (
      <List onClick={toggleDrawer(false)}>
        {routes.map((route, key) => {
          return (

            <NavLink to={{ pathname: route.path, open: false }} activeClassName="active" key={key}>
              <ListItem button className={classes.itemLink}>
                <route.icon className={classNames(classes.itemIcon)} />
                {route.name === "Categoria" ?
                  <div>
                      <ArrowForwardIcon className={classNames(classes.categoryIcon)}/>
                    <ListItemText
                      primary={route.name}
                      className={classNames(classes.itemText)}
                      onMouseOver={handleOpenMenu}

                    />
                    <MenuMaterial
                      id="simple-menu"
                      anchorEl={anchorEl}
                      anchorReference="anchorPosition"
                      anchorPosition={{ top: 222, left: 260 }}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      classes={{ paper: classes.paper }}
                      className={classes.menuContainer}
                      MenuListProps={{
                        disablePadding: true,
                        onMouseLeave: handleClose
                      }}
                    >
                      <div className={classes.menus}>
                        <MenuItem onClick={handleClose} className={classes.itemMenu}>Profile</MenuItem>
                        <MenuItem onClick={handleClose} className={classes.itemMenu}>My account</MenuItem>
                        <MenuItem onClick={handleClose} className={classes.itemMenu}>Logout</MenuItem>
                      </div>
                    </MenuMaterial>
                  </div>

                  :
                  <ListItemText
                    primary={route.name}
                    className={classNames(classes.itemText)}
                  />
                }
              </ListItem>
            </NavLink>
          )
        })}
      </List>
    );
  }


  if (user === null) return null;
  const roleFilter = user.user.role


  return (
    <>
      <div className={classes.logo}>
        <Link
          to={`/`}
          className={classNames(classes.logoLink)}
          style={{ textDecoration: "none" }}
          onClick={toggleDrawer(false)}
        >
          SKINCARE BOUTIQUE
        </Link>

        <div className={classNames(classes.logoName)}>
          {user ? <div>Hola {user.user.firstName}</div> : null}
        </div>
      </div>

      <div className={classes.sidebarWrapper}>
        {routeList(plainUserPath)}

        {(roleFilter[0] !== "admin") ? null : routeList(adminUserPath)}

        <ListItem button className={classes.itemLink}>
          <ExitToAppIcon className={classNames(classes.itemIcon)} />
          <ListItemText
            onClick={onCLickSignOff}
            className={classNames(classes.itemText)}
          >
            <Link
              to={`/`}
              className={classNames(classes.itemText)}
              style={{ textDecoration: "none" }}
              onClick={toggleDrawer(false)}
            >
              Cerrar Sesion
            </Link>

          </ListItemText>
        </ListItem>
      </div>
    </>
  )
}

