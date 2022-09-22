import React, { useState, useContext, useEffect } from "react";
import classNames from "classnames";
import Style from "./Style";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserContext from "../../context/productsContext/userContext/UserContext";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Button, IconButton, ListItemText, ListItem, List, Drawer, ListItemIcon } from "@material-ui/core";
import CategoryContext from "../../context/categoryContext/CategoryContext";
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

            <Link to={"/login"} className={classes.linkButton} style={{ textDecoration: 'none' }}>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={toggleDrawer(false)}
                className={classes.loginButton}
              >
                Iniciar Secion
              </Button>
            </Link>
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

  //CategoryContext
  const categoryContext = useContext(CategoryContext)
  const { getCategory, categories } = categoryContext
  //hooks
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getCategory()

  }, [getCategory])

  const onCLickSignOff = () => {
    signOff();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(!anchorEl)
  }
  const routeList = (routes) => {

    return (
      <List disablePadding>
        {routes.map((route, key) => {
          return (
            <ListItem button
              className={!anchorEl || route.name !== "Categoria" ? `${classes.list} ${classes.listHover}` : `${classes.list}`}
              component={Link} to={route.path} key={key}
            >

              {route.name === "Categoria" ?
                <div onClick={handleOpenMenu} className={classes.categoryContainer}>
                  <ListItemIcon className={classes.itemIcon}>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    className={classes.itemText}
                    onClick={toggleDrawer(false)}
                  />

                  {anchorEl ?
                    <>
                      <List onClick={handleClose} className={classes.categoryList}>
                        {categories.map((category) => {
                          return (
                            <ListItem button className={`${classes.listHover}`} key={category._id}>
                              <ListItemText className={classes.itemText} primary={category.name} />
                            </ListItem>
                          )
                        })}
                      </List>
                      <ListItemIcon className={classes.itemIcon}>
                        <ArrowDownwardIcon />
                      </ListItemIcon>
                    </>
                    : <ListItemIcon className={`${classes.itemIcon} + ${classes.arrowIcon}`}>
                      <ArrowForwardIcon />
                    </ListItemIcon>
                  }
                </div>

                :
                <>
                  <ListItemIcon className={classes.itemIcon}>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    className={classes.itemText}
                    onClick={toggleDrawer(false)}
                  />
                </>
              }
            </ListItem>
          )
        })}
      </List>
    );
  }


  if (user === null) return null;
  const roleFilter = user.user.role


  return (
    <>
      <div className={classes.logoConteiner}>
        <Link
          to={`/`}
          className={classes.logoLink}
          style={{ textDecoration: "none" }}
          onClick={toggleDrawer(false)}
        >
          SKINCARE BOUTIQUE
        </Link>

        <div className={classes.title}>
          {user ? <div>Hola {user.user.firstName}</div> : null}
        </div>
      </div>

      <div>
        {routeList(plainUserPath)}

        {(roleFilter[0] !== "admin") ? null : routeList(adminUserPath)}
        <List disablePadding>
          <ListItem className={`${classes.list} ${classes.listHover}`} to={`/`}>
            <ListItemIcon className={classes.itemIcon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Cerrar Sesion"}
              className={classes.itemText}
              onClick={onCLickSignOff}
            />
          </ListItem>
        </List>
      </div>
    </>
  )
}

