import { BrowserRouter as Router} from "react-router-dom";
import ProductState from "./context/productsContext/ProductState";
import UserState from "./context/userContext/UserState";
import "./App.css";
import CartState from "./context/cartContext/CartState";
import SnackbarState from "./context/snackbarContext/SnackbarState";
import Layout from "./components/layout/Layout";
import Theme from "./components/theme/Theme";
import FileState from "./context/fileContext/FileState";
import CategoryState from "./context/categoryContext/CategoryState";
import AppRoutes from "./components/AppRoutes";
import tokenAuth from "./config/token";
var divStyle = {
  backgroundColor: "#FEF7E4",
  marginRight: "-1rem",
};

// revisar si tenemos un token
const token = localStorage.getItem("token")
if(token){
  tokenAuth(token)
}
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
                        <AppRoutes />
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
