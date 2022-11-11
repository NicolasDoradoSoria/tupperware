import { makeStyles } from '@material-ui/core'
import { purple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({

    root: {
        display: "flex",
        justifyContent: "center",

    },
    card: {
        borderRadius: "10px",
        minWidth: 275,
        marginTop: "10rem",
        marginBottom: "10rem"
    },

    cardContentAproved: {
        backgroundColor: "green",
        textAlign: "center"
    },
    cardContentDeneg: {
        backgroundColor: "red",
        textAlign: "center"
    },
    title: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        marginTop: "1.5rem"
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        color: purple[300],
        fontSize: 100,
    },
    buttonContainer:{
        marginTop: "2rem",
        marginBottom: "1rem"
    }
}))
