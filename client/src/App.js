import { BrowserRouter as Router } from "react-router-dom";
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
import OrderState from "./context/orderContext/OrderState";
import { createTheme, ThemeProvider } from "@material-ui/core";
var divStyle = {
  backgroundColor: "#FEF7E4",
  marginRight: "-1rem",
};

// revisar si tenemos un token
const token = localStorage.getItem("token")
if (token) {
  tokenAuth(token)
}

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

function App() {

  return (
    <div style={divStyle}>
      <SnackbarState>
        <OrderState>
          <CategoryState>
            <FileState>
              <UserState>
                <ProductState>
                  <CartState>
                    <Router>
                      <Theme>
                        <ThemeProvider theme={theme}>
                          <Layout>
                            <AppRoutes />
                          </Layout>
                        </ThemeProvider>
                      </Theme>
                    </Router>
                  </CartState>
                </ProductState>
              </UserState>
            </FileState>
          </CategoryState>
        </OrderState>
      </SnackbarState>
    </div>
  );
}

export default App;
