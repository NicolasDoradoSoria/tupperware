import { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Style from "./Style";
import Copyright from "./Copyright";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext/UserContext";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";

export default function Login() {
  const navigate = useNavigate();
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);

  const {
    authenticated,
    login,
    msg
  } = userContext;


  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const {openSnackbar } = snackbarContext


  // hook de create user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // destroyoning del hook user
  const { email, password } = user;

  useEffect(() => {
    if (authenticated) {
      navigate("/")
    }

    if(msg) {
      openSnackbar(msg.msg, msg.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, msg]);

const onChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};
const onSubmit = (e) => {
  e.preventDefault();

  // manda los datos de usuario al userContext
  login({ email, password });
};

const loginButtonDisabled = () => {
  return isEmpty(email) || isEmpty(password);
};

const isEmpty = (aField) => {
  return aField === "";
};
return (
  <div className={classes.root}>
    <Container
      component="main"
      maxWidth="xs"
      className={classes.container}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="AppBar">
          Login
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Direccion de Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="clave"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="recordar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginButtonDisabled()}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                te olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/nueva-cuenta"} variant="body2">
                {"no tienes cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
          {msg ?
            <SnackbarOpen /> : null
          }
        </form>
      </div>
    </Container>
    <Box mt={8}>
      <Copyright />
    </Box>
  </div>
);
}
