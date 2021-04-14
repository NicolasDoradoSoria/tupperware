import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Appbar from "./components/AppBar/AppBar";
import Categoria from "./components/categoria/Categoria";
import Login from "./components/Login/Login";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import SignUp from "./components/signUp/SignUp";
import ProductDescription from "./components/productDescription/ProductDescription";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import ProductState from "./context/productsContext/ProductState";
import UserState from "./context/productsContext/userContext/UserState";
import "./App.css";
import ListProductsTable from './components/listProductsTable/ListProductsTable'
import AddProduct from "./components/addProduct/AddProduct";
import PaymentMethod from "./components/payment/paymentMethod";
import CartState from "./context/cartContext/CartState";

var divStyle = {
  backgroundColor: "#D8CEB0",
  marginRight: "-1rem",
  minHeight: "950px"
};

function App() {


  return (
    <div style={divStyle}>

      <UserState>
        <ProductState>
          <CartState>
            <Router>
              <Appbar />
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/main/categoria" component={Categoria} />
                <Route
                  exact
                  path="/main/descripcion-producto/:id"
                  component={ProductDescription}
                />
                <Route exact path="/main/carrito" component={ShoppingCart} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/nueva-cuenta" component={SignUp} />
                <Route exact path="/perfil" component={Profile} />
                <Route exact path="/todos-Productos" component={ListProductsTable} />
                <Route exact path="/agregar-producto" component={AddProduct} />
                <Route exact path="/pagar" component={PaymentMethod} />
              descripcion-producto
            </Switch>
            </Router>
          </CartState>
        </ProductState>
      </UserState>
    </div>
  );
}

export default App;
