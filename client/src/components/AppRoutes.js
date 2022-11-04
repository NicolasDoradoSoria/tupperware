import { Route, Routes } from "react-router";
import ProductListManagement from './ProductListManagement/ProductListManagement'
import AddProduct from "./addProduct/AddProduct";
import PaymentMethod from "./payment/paymentMethod";
import ListOfProducts from "./listOfProducts/ListOfProducts"
import MainCarrouselManager from "./mainCarouselManager/MainCarouselManager";
import Main from "./main/Main";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Categoria from "./categoria/Categoria";
import Login from "./Login/Login";
import Profile from "./profile/Profile";
import SignUp from "./signUp/SignUp";
import Publication from "./publication/Publication";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import { useContext } from "react";
import UserContext from "../context/userContext/UserContext";
import Category from "./Category/Category";

const AppRoutes = () => {

    //userContext
    const userContext = useContext(UserContext);
    const { user, authenticated, loading } = userContext;

    return (
        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/main/categoria" element={<Categoria />} />
            <Route exact path="/main/descripcion-producto/:id" element={<Publication />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/nueva-cuenta" element={<SignUp />} />
            
            {(loading) ?
                <>
                    <Route element={<ProtectedRoute isAllowed={!!authenticated} />}>
                        <Route exact path="/lista-Productos/:id" element={<ListOfProducts />} />
                        <Route exact path="/lista-Productos/" element={<ListOfProducts />} />
                        <Route exact path="/perfil" element={<Profile />} />
                        <Route exact path="/main/carrito" element={<ShoppingCart />} />
                        <Route exact path="/pagar" element={<PaymentMethod />} />

                    </Route>
                    <Route element={<ProtectedRoute isAllowed={!!authenticated && user.user.roles.some(rol => rol.name === "admin")} />}>
                        <Route exact path="/agregar-producto" element={<AddProduct />} />
                        <Route exact path="/agregar-categoria" element={<Category />} />
                        <Route exact path="/todos-Productos" element={<ProductListManagement />} />
                        <Route exact path="/administrador-Carrusel-Principal" element={<MainCarrouselManager />} />
                    </Route>
                </>
                : <></>
            }

        </Routes>
    );
}

export default AppRoutes;