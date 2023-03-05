import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Dropdown from "./Dropdown";
import { AppBar, Badge, Button, IconButton, Toolbar } from "@material-ui/core";
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
        name: "perfil",
        path: "/perfil",
    },
    {
        id: 2,
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
// barra de navegacion
export default function Navbar() {
    const classes = Style();

    // click en modo mobile para desplegar la barra de navegacion
    const [click, setClick] = useState(false)

    // hook de barra desplegable de la categoria
    const [dropdownCategory, setDropdownCategory] = useState(false)

    //userContext
    const userContext = useContext(UserContext);
    const { authenticated, authenticatedUser } = userContext;

    //CategoryContext
    const categoryContext = useContext(CategoryContext)
    const { categories } = categoryContext


    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

    // sirve para cuando paso el mouse por la categoria se despliegue el menu
    const onMouseEnterCategory = () => (window.innerWidth < 960) ? setDropdownCategory(false) : setDropdownCategory(true)
    const onMouseLeaveCategory = () => (window.innerWidth < 960) ? setDropdownCategory(false) : setDropdownCategory(false)

    useEffect(() => {
        authenticatedUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.grow}>


            <AppBar position="fixed" className={classes.root}>
                {/* si no esta despleglado en modo mobile muestra MenuIcon si esta desplegablo muesta el CloseIcon esto solo sirve para modo mobile */}
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <CloseIcon /> : <MenuIcon />}
                </div>

                <Toolbar className={click ? "nav-menu active" : "nav-menu"}>
                    {/* inicio */}
                    <div className="nav-item seccion">
                        <Link to={"/"} className='nav-links' onClick={closeMobileMenu}>Inicio</Link>
                    </div>
                    {/* categorias */}
                    {/* cuenta con un icono mostrar que tiene un subMenu al pasar el mouse se despliega*/}
                    <div className="nav-item seccion category" onMouseEnter={onMouseEnterCategory} onMouseLeave={onMouseLeaveCategory}>
                        <Link to={"/"} className='nav-links' onClick={closeMobileMenu}>Categoria</Link>
                        <IconButton aria-label="show 4 new mails" edge="start">
                            <Badge>
                                <ArrowDropDownIcon className={classes.icon} />
                            </Badge>
                        </IconButton>
                        {dropdownCategory && <Dropdown path={categories} />}
                    </div>
                    {/* si no esta Autenticado dira que se logee si no directamente desplegaria todas las opciones disponible en USERPARTH */}
                    {authenticated ?
                        <UserPath setClick={setClick} /> : (
                            <div className='nav-item'>
                                <Link to={"/login"} className='nav-links' onClick={closeMobileMenu}>iniciar Secion</Link>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

// componente para las opciones del usuario logeado
const UserPath = ({ setClick }) => {
    const classes = Style();
    const navigate = useNavigate();

    // hook de barra desplegable del admistrador
    const [dropdownAdmin, setDropdownAdmin] = useState(false)

    //userContext
    const userContext = useContext(UserContext);
    const { user, signOff, loading } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { orders } = cartContext

    const closeMobileMenu = () => setClick(false)

    // sirve para cuando paso el mouse por el menu despliegue administrador
    const onMouseEnterAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(true)
    const onMouseLeaveAdmin = () => (window.innerWidth < 960) ? setDropdownAdmin(false) : setDropdownAdmin(false)

    const handleNavegation = () => navigate("/main/carrito")

    const routeList = (routes) => {
        return (
            <>
                {routes.map((route, key) => {
                    return (
                        <div className="nav-item seccion" key={key}>
                            <Link to={route.path} className='nav-links' onClick={closeMobileMenu}>{route.name}</Link>
                        </div>
                    )
                })}
            </>
        )
    }

    if (!loading) return null;
    if (!orders) return null
    const isAdmin = user.user.roles.some(rol => rol.name === "admin")

    return (
        <>
            <div className="left_conteiner">
                {routeList(plainUserPath)}

                {/* este menu solo aparaecera si el usario tiene privilegios de admin */}
                {isAdmin ?
                    <div className="nav-item" onMouseEnter={onMouseEnterAdmin} onMouseLeave={onMouseLeaveAdmin}>
                        <Link to={"/"} className='nav-links' onClick={closeMobileMenu}>Administrador</Link>
                        <IconButton aria-label="show 4 new mails" edge="start">
                            <Badge>
                                <ArrowDropDownIcon className={classes.icon} />
                            </Badge>
                        </IconButton>
                        {dropdownAdmin && <Dropdown path={adminUserPath} />}
                    </div>
                    : null}
            </div>
            <div className="nav-item">
                <Button className={classes.signOffButton} variant="contained" color="primary" onClick={() => signOff()}>
                    cerrar secion
                </Button>
            </div>
            {/* </div> */}
            <div className="nav-item mobile">
                <Search />
            </div>
            <div className="nav-item mobile">
                <IconButton aria-label="cart" color="inherit" onClick={handleNavegation}>
                    <Badge badgeContent={user ? orders.products.length : null} color="secondary" overlap="rectangular">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </div>
        </>
    )
}