import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        marginTop: "2rem",
        marginBottom: "3rem", 
    },
    paperUploadedPhoto: {
        margin: "auto",
        [theme.breakpoints.up('sm')]: {
            width: '30%',
        },
        [theme.breakpoints.up('xs')]: {
            width: '70%',
        },
        [theme.breakpoints.up('md')]: {
            width: '85%',
        },
    },
    gridTextarea: {
        textAlign: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "column",
        },
        [theme.breakpoints.up('xs')]: {
            flexDirection: "column",
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
        },
    },
    img: {
        marginLeft: "2rem",
        display: "none",
    },
    divUploaderImage: {
        display: "flex",
        marginBottom: "2rem",
        paddingLeft: "2rem",
        [theme.breakpoints.up('sm')]: {
            flexDirection: "column",
        },
        [theme.breakpoints.up('xs')]: {
            flexDirection: "column",
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
        },
    },
    buttonDeleteImage: {
        marginBottom: "2rem"
    },
    textImg: {
        opacity: "0.3",
    },
    
}))