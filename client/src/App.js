import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categoria from "./components/categoria/Categoria";
import Login from "./components/Login/Login";
import Profile from "./components/profile/Profile";
import SignUp from "./components/signUp/SignUp";
import Publication from "./components/publication/Publication";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import ProductState from "./context/productsContext/ProductState";
import UserState from "./context/productsContext/userContext/UserState";
import "./App.css";
import ProductListManagement from './components/ProductListManagement/ProductListManagement'
import AddProduct from "./components/addProduct/AddProduct";
import PaymentMethod from "./components/payment/paymentMethod";
import CartState from "./context/cartContext/CartState";
import SnackbarState from "./context/snackbarContext/SnackbarState";
import Layout from "./components/layout/Layout";
import Theme from "./components/theme/Theme";
import FileState from "./context/fileContext/FileState";
import ListOfProducts from "./components/listOfProducts/ListOfProducts"
import MainCarrouselManager from "./components/mainCarouselManager/MainCarouselManager";
import CategoryState from "./context/categoryContext/CategoryState";
import Main from "./components/main/Main";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
var divStyle = {
  backgroundColor: "#FEF7E4",
  marginRight: "-1rem",
};

function App() {
  return (
    <div style={divStyle}>
      <SnackbarState>
        <CategoryState>

          <FileState>
            <UserState>
              <ProductState>
                <CartState>
                  <Router>
                    <Theme>
                      <Layout>
                        <Routes>
                          <Route exact path="/" element={<Main />} />
                          <Route exact path="/lista-Productos/" element={<ListOfProducts />} />
                          <Route exact path="/lista-Productos/:id" element={<ListOfProducts />} />
                          <Route exact path="/administrador-Carrusel-Principal" element={<MainCarrouselManager/>} />
                          <Route exact path="/main/categoria" element={<Categoria/>} />
                          <Route exact path="/main/descripcion-producto/:id" element={<Publication />} />
                          <Route exact path="/main/carrito" element={<ShoppingCart />} />
                          <Route exact path="/login" element={<Login />} />
                          <Route exact path="/nueva-cuenta" element={<SignUp/>} />
                          <Route exact path="/perfil" element={<Profile/>} />
                          <Route exact path="/todos-Productos" element={<ProductListManagement/>} />
                          <Route exact path="/agregar-producto" element={<AddProduct />} />
                          <Route exact path="/pagar" element={<PaymentMethod/>} />
                          descripcion-producto
                        </Routes>
                      </Layout>
                    </Theme>
                  </Router>
                </CartState>
              </ProductState>
            </UserState>
          </FileState>
        </CategoryState>
      </SnackbarState>
    </div>
  );
}

export default App;
