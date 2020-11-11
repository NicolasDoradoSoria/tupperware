import React, { Fragment, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";


const Profile = () => {
  const classes = Style();
  const [value, setValue] = useState("female");
  const [selectedDate, setSelectedDate] = useState(new Date("2020-08-18"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGerderChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ height: "100vh" }}>
          <Grid container justify="center" alignItems="center">
            <div className={classes.root}>
              <Avatar src="/static/images/avatar/2.jpg" />
            </div>
          </Grid>
          <h1 className="title">Nicolas</h1>
          <Box border={2} />
          <form className={classes.root}>
            <Grid container spacing={3} className={classes.fonds}>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="apellido"
                />
              </Grid>

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
                <FormControl component="fieldset">
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
                </FormControl>
              </Grid>
              <Grid  item xs={6}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem>OPCIONES</MenuItem>
                </Select>
              </Grid>
              <Grid  item xs={6}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem>OPCIONES2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="Email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="Documento"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="Telefono"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="standard-disabled"
                  defaultValue="Telefono AL"
                />
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Container>
    </Fragment>
  );
};

export default Profile;
