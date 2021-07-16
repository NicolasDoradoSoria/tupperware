import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import * as moment from 'moment';
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from 'react-router-dom'
import Style from './Style';
import UserContext from "../../context/productsContext/userContext/UserContext";


const Profile = ({ history }) => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { authenticated } = userContext;
 
  if (!authenticated) {
    history.push("/login")
    return null
  }

  //userContext
  const { user } = userContext;
  const { email, firstName, lastName, dni, phone, cp, alternativePhone, gender, dateOfBirth } = user.user

  const beginDate = moment(dateOfBirth).format('DD/MM/YYYY')


  return (
    <div className={classes.main}>
      <Container maxWidth="sm" className={classes.container}>
        <Typography component="div">
          <Grid container justify="center">
            <div className={classes.root}>
              <Avatar src="/static/images/avatar/2.jpg" />
            </div>
          </Grid>
          <Typography component="p" variant="h3" className={classes.title}>
            {firstName} {lastName}
          </Typography>
          <Box border={2} />
          <form className={classes.root}>
            <Grid container spacing={6} className={classes.fonds}>
              <Grid item xs={6} >
                <FormLabel component="legend">Fecha de Nacimiento</FormLabel>
                <Typography component="p" variant="h6">
                  {beginDate}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.gener}>
                <FormLabel component="legend">Genero</FormLabel>

                {gender === "femer" ? <Typography component="p" variant="h6" >
                  Femenino
              </Typography> : <Typography component="p" variant="h6" >
                  Masculino
              </Typography>}
              </Grid>
              <Grid item xs={6} >
                <FormLabel component="legend">Email</FormLabel>
                <Typography component="p" variant="h6">
                  {email}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.dni}>
                <FormLabel component="legend">DNI</FormLabel>
                <Typography component="p" variant="h6" >
                  {dni}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Telefono</FormLabel>
                <Typography component="p" variant="h6" >
                  {phone}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.gridTel}>
                <FormLabel component="legend">Telefono Alternativo</FormLabel>
                <Typography component="p" variant="h6" >
                  {alternativePhone}
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <Box border={2} />
              </Grid>
              <Grid item xs={12} >
                <Typography component="p" variant="h4" color="primary">
                  Envio
             </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography component="p" variant="h5">
                  Direccion
             </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography component="p" variant="h5">
                  Localidad
             </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography component="p" variant="h5">
                  {cp}
                </Typography>
              </Grid>
            </Grid>

          </form>
        </Typography>

      </Container>

    </div>
  );
};

export default withRouter(Profile);
