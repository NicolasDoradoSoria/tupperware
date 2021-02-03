import React, { useContext, useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";
import SnackbarOpen from "../snackbar/SnackBar";

export default function Login(props) {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const {
    authenticated,
    error,
    msg,
    severity,
    ShowError,
    login,
    closeError,
  } = userContext;

  // hook de create user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // destroyoning del hook user
  const { email, password } = user;

  useEffect(() => {
    if (authenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeError();
  };

  const loginButtonDisabled = () => {
    return isEmpty(email) || isEmpty(password);
  };

  const isEmpty = (aField) => {
    return aField === "";
  };
  return (
    <div  className={classes.login}>
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
                <Link href="#" variant="body2">
                  te olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/nueva-cuenta"} variant="body2">
                  {"no tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
            <SnackbarOpen
              msg={msg}
              open={error}
              severity={severity}
              handleClose={handleClose}
            />
          </form>
        </div>
      </Container>
        <Box mt={8}  className={classes.boxCopyright}>
          <Copyright />
        </Box>
    </div>
  );
}
