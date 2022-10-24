import React, { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import { withRouter } from 'react-router-dom'
import Style from "./Style";

//context
import ProductContext from "../../context/productsContext/ProductContext";
const Search = ({ history }) => {
    const classes = Style();

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
        <>

            <div className={classes.search} >
                <Autocomplete
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={handleSearch}
                    options={productsAll}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label="Buscar producto" variant="filled" />
                    )}
                />
            </div>
           
        </>
    );
}

export default withRouter(Search);