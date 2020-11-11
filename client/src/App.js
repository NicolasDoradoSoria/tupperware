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
function App() {
  return (
    <UserState>
      <ProductState>
        <Router>
          <Appbar />
          <Switch>
         
            <Route exact path="/" component={Main} />
            <Route exact path="/main/categoria" component={Categoria} />
            <Route
              exact
              path="/main/descripcion-producto"
              component={ProductDescription}
            />
            <Route exact path="/main/carrito" component={ShoppingCart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/nueva-cuenta" component={SignUp} />
            <Route exact path="/perfil" component={Profile} />
            descripcion-producto
          </Switch>
        </Router>
      </ProductState>
    </UserState>
  );
}

export default App;
