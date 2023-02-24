import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dropdown from "./Dropdown";
import { AppBar, Badge, Button, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import UserContext from "../../context/userContext/UserContext";
import CategoryContext from "../../context/categoryContext/CategoryContext";
import Search from "../search/Search";
import "./Style.css";
import Style from "./Style";
import CartContext from "../../context/cartContext/CartContext";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useNavigate } from 'react-router-dom'

const plainUserPath = [

    {
        id: 1,
        name: "Inicio",
        path: "/",
    },
    {
        id: 2,
        name: "perfil",
        path: "/perfil",
    },
    {
        id: 3,
        name: "carrito",
        path: "/main/carrito",
    },
];
const adminUserPath = [
    {
        name: "Lista de Productos",
        path: "todos-Productos",
        cName: "dropdown-link"
    },
    {
        name: "Agregar Producto",
        path: "agregar-producto",
        cName: "dropdown-link"
    },
    {
        name: "Administrador Carrousel Principal",
        path: "administrador-Carrusel-Principal",
        cName: "dropdown-link"
    },
    {
        name: "Agregar categoria",
        path: "agregar-categoria",
        cName: "dropdown-link"
    },
    {
        name: "Pedidos",
        path: "order",
        cName: "dropdown-link"
    },
];

export default function Navbar() {
    const classes = Style();
    const [click, setClick] = useState(false)


    //userContext
    const userContext = useContext(UserContext);
    const { authenticated, authenticatedUser } = userContext;


    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)


    useEffect(() => {
        authenticatedUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppBar position="fixed" className={classes.root} style={{ flexDirection: "row" }}>
            <div className="menu-icon" onClick={handleClick}>
                {click ? <CloseIcon /> : <MenuIcon />}
            </div>

            {authenticated ? <UserPath click={click} setClick={setClick} /> : (

                <List className={click ? "nav-menu active" : "nav-menu"} disablePadding>
                    <ListItem button className='nav-item seccion' component={Link} to={"/"}>
                        <ListItemText primary={"Inicio"} className='nav-links' onClick={closeMobileMenu} />
                    </ListItem>
                    <ListItem button className='nav-item seccion' component={Link} to={"/login"}>
                        <ListItemText primary={"iniciar Secion"} className='nav-links' onClick={closeMobileMenu} />
                    </ListItem>
                </List>
            )
            }

        </AppBar>
    )
}

const UserPath = ({ click, setClick }) => {
    const classes = Style();
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false)
    const [dropdownAdmin, setDropdownAdmin] = useState(false)

    //userContext
    const userContext = useContext(UserContext);
    const { user, signOff, loading } = userContext;

    //CategoryContext
    const categoryContext = useContext(CategoryContext)
    const { categories } = categoryContext

    //cartContext
    const cartContext = useContext(CartContext);
    const { orders } = cartContext

    const closeMobileMenu = () => setClick(false)

    const onMouseEnterCategory = () => (window.innerWidth < 960) ? setDropdown(false) : setDropdown(true)
    const onMouseLeaveCategory = () => (window.innerWidth < 960) ? setDropdown(false) : setDropdown(false)
    const onMouseEnterAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(true)
    const onMouseLeaveAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(false)

    const handleNavegation = () => navigate("/main/carrito")

    const routeList = (routes) => {
        return (
            <>
                {routes.map((route, key) => {
                    return (
                        <ListItem button component={Link} className="nav-item" key={key} to={route.path}>
                            <ListItemText className='nav-links' onClick={closeMobileMenu} primary={route.name} />
                        </ListItem>
                    )
                })}
            </>
        )
    }

    if (!loading) return null;
    if(!orders) return null
    const isAdmin = user.user.roles.some(rol => rol.name === "admin")

    return (
        <>

            <List className={click ? "nav-menu active" : "nav-menu"} disablePadding>

                {routeList(plainUserPath)}

                <ListItem button className='nav-item' onMouseEnter={onMouseEnterCategory} onMouseLeave={onMouseLeaveCategory}>
                    <Link to={"/"} className='nav-links' onClick={closeMobileMenu}>
                        Categoria
                        <ArrowDropDownIcon className={classes.icon} />
                    </Link>
                    {dropdown && <Dropdown path={categories} />}
                </ListItem>

                {isAdmin ?
                    <ListItem button className='nav-item' onMouseEnter={onMouseEnterAdmin} onMouseLeave={onMouseLeaveAdmin} >
                        <Link to={"/"} className='nav-links' onClick={closeMobileMenu}>
                            Administrador
                            <ArrowDropDownIcon className={classes.icon} />
                        </Link>
                        {dropdownAdmin && <Dropdown path={adminUserPath} />}
                    </ListItem>
                    : null}
            </List>
            <div className="rightContainer">
                <div className="buttonContainer" >
                    <Button className={classes.signOffButton} variant="contained" color="primary" onClick={() => signOff()}>
                        cerrar secion
                    </Button>
                </div>
                <div className="searchContainer">
                    <Search />
                </div>
                <div className="cartContainer">
                    <IconButton aria-label="cart" color="inherit" onClick={handleNavegation}>
                        <Badge badgeContent={user ? orders.products.length : null} color="secondary" overlap="rectangular">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </>
    )
}