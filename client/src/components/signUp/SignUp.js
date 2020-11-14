import React, { useState,useContext,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Style from "./Style";
import { Link } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";
import SnackbarOpen from "../snackbar/SnackBar";

export default function SignUp(props) {
    const classes = Style();
    //userContext
    const userContext = useContext(UserContext)
    const { authenticated, error, msg,severity, ShowError, registerUser, closeError} = userContext


    // hook de create user
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmar: "",
    })
    // destroyoning del hook user
    const {firstName, lastName, email, password, confirmar} = user
    

    useEffect(() => {
      if(authenticated){
        props.history.push("/");
      }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated])

  const onChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  
  const loginButtonDisabled = () =>{
    return isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) ||isEmpty(password) || isEmpty(confirmar) 
  }

  const isEmpty = (aField) => {
    return aField === "";
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== confirmar){
      ShowError("las contraseñas no coinciden")
    }
    else{
      closeError()
      registerUser({firstName,lastName,email,password})
    }

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeError()
  };

  return (
    <Container component="main" maxWidth="xs" style={{backgroundColor: "#E2E8E7"}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={firstName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="apellido"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmar"
                label="confirmar password"
                type="password"
                id="confirmar"
                autoComplete="current-password"
                value={confirmar}
                onChange={onChange}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginButtonDisabled()}
          >REGISTRARME</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to={"/"} variant="body2">
                obtener cuenta
              </Link>
            </Grid>
          </Grid>
        <SnackbarOpen msg={msg} open={error} severity={severity} handleClose={handleClose}/>
        </form>
      </div>
    </Container>
  );
}
