import React, { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles, createStyles } from '@material-ui/core/styles';
import ProductContext from "../../context/productsContext/ProductContext";
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles((theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(4),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            }
        },
    })
)
const Search = ({ history }) => {
    const classes = useStyles();

    //context products
    const productsContext = useContext(ProductContext);
    const {
        searchProducts, productsAll } = productsContext;
    const handleSearch = async (e, values) => {
        e.preventDefault()
        history.push("/")
        searchProducts(values)
    }

    return (
        <div className={classes.search} style={{ width: "50%" }}>
            <div className={classes.searchIcon}>
                <SearchIcon />

            </div>

            <Autocomplete
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                onChange={handleSearch}
                options={productsAll}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} label="buscar producto" variant="outlined" />
                )}
            />
        </div>
    );
}

export default withRouter(Search);