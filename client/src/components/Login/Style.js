import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(5),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    backgroundColor: "#E2E8E7",
    height: '66vh',
    marginTop: "4rem"
  },
  marginRight: theme.spacing(1),

}));

