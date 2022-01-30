import { alpha, makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
    
        inputRoot: {
            color: "inherit"
        },
        inputInput: {
            paddingLeft: `calc(1rem + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "50ch",
                "&:focus": {
                    width: "30ch",
                }
            },
        },
    })
)