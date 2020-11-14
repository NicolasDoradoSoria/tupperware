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

var divStyle = {
  backgroundImage: "url('https://www.klaviyo.com/wp-content/uploads/2016/09/abstract-background-1024x273.jpg')",
  width: "100%",
  height: "100vh",
}

function App() {
  return (
    <div style={divStyle} >

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
              </div>
  );
}

export default App;
