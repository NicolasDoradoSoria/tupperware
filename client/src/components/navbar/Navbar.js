import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dropdown from "./Dropdown";
import { AppBar, Button, List, ListItem, ListItemText } from "@material-ui/core";
import UserContext from "../../context/productsContext/userContext/UserContext";
import CategoryContext from "../../context/categoryContext/CategoryContext";
import Search from "../search/Search";
import Cart from "../cart/Cart";
import "./Style.css";
import Style from "./Style";


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
];

export default function Navbar() {
    const classes = Style();
    const [click, setClick] = useState(false)


    //userContext
    const userContext = useContext(UserContext);
    const { authenticated } = userContext;


    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

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
    const [dropdown, setDropdown] = useState(false)
    const [dropdownAdmin, setDropdownAdmin] = useState(false)

    //userContext
    const userContext = useContext(UserContext);
    const { user, signOff, loading } = userContext;

    //CategoryContext
    const categoryContext = useContext(CategoryContext)
    const { categories } = categoryContext


    const closeMobileMenu = () => setClick(false)

    const onMouseEnterCategory = () => (window.innerWidth < 960) ? setDropdown(false) : setDropdown(true)
    const onMouseLeaveCategory = () => (window.innerWidth < 960) ? setDropdown(false) : setDropdown(false)
    const onMouseEnterAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(true)
    const onMouseLeaveAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(false)


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
    const isAdmin = user.user.roles.some(rol => rol.name === "admin")

    return (
        <>

            <List className={click ? "nav-menu active" : "nav-menu"} disablePadding>

                {routeList(plainUserPath)}

                <ListItem button className='nav-item' onMouseEnter={onMouseEnterCategory} onMouseLeave={onMouseLeaveCategory} to={"/"}>
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
                    <Cart />
                </div>
            </div>
        </>
    )
}