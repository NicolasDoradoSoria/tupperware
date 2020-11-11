import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Style from './Style';
import Copyright from './Copyright';
import AppBar from '@material-ui/core/AppBar';
import './Login.css';
import { Link } from "react-router-dom";

export default function Login() {
  const classes = Style()

  return (
    <Container  component="main" maxWidth="xs" style={{ backgroundColor: '#cfe8fc', height: '60%' }} >
      <CssBaseline />
      <div className={classes.paper}>
      <AppBar position="static" className="AppBar">
        <Typography component="h1" variant="h5" className="AppBar">
          Login
        </Typography>
      
      </AppBar>
        <form className={classes.form} noValidate>
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
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}