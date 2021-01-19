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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    container: {
      backgroundColor: "#E2E8E7"
    },
    login: {
      padding: "0 0 5rem 0"
    },
    marginRight: theme.spacing(1),
    
  }));

