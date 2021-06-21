import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MomentUtils from "@date-io/moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Style from './Style';
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import UserContext from "../../context/productsContext/userContext/UserContext";


const Profile = () => {
  const classes = Style();
  const [value, setValue] = useState("female");
  const [selectedDate, setSelectedDate] = useState(new Date("2020-08-18"));

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const { email, firstName, lastName } = user.user
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleGerderChange = (event) => {
    setValue(event.target.value);
  };
  return (
    
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
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker"
                    label="Fecha de nacimiento"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Genero</FormLabel>
                <Typography component="p" variant="h5" >
                  Genero
             </Typography>
                {/* <FormControl component="fieldset">
                <FormLabel component="legend">Genero</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleGerderChange}
                  row={true}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Masculino"
                  />
                </RadioGroup>
              </FormControl> */}
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Email</FormLabel>
                <Typography component="p" variant="h5" >
                  {email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">DNI</FormLabel>
                <Typography component="p" variant="h5" >
                  DNI
             </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormLabel component="legend">Telefono</FormLabel>
                <Typography component="p" variant="h5" >
                  Tel
             </Typography>
              </Grid>
              <Grid item xs={6} className={classes.gridTel}>
                <FormLabel component="legend">Telefono Alternativo</FormLabel>
                <Typography component="p" variant="h5" >
                  TEl Alt
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
                  CP
             </Typography>
              </Grid>
            </Grid>

          </form>
        </Typography>

      </Container>
  );
};

export default Profile;
