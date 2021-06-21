import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  roots: {
    minWidth: 275,
    width: "33%",
    alignItems: 'center',
    display: 'flex',
    height: '93%',
  },
  main: {
    display: 'flex',
    justifyContent: "center",
    height: '150vh',
    alignItems: 'center',
  },

  generoRadio: {
    display: "flex",
    flexDirection: "column"
  },
  genero: {
    display: "flex",
    flexDirection: "column"
  }
}));