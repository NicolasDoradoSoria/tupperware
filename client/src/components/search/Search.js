import React, { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import { Navigate } from 'react-router-dom'
import Style from "./Style";

//context
import ProductContext from "../../context/productsContext/ProductContext";
const Search = () => {
    const classes = Style();

    //context products
    const productsContext = useContext(ProductContext);
    const { searchProducts, productsAll } = productsContext;
    
    const handleSearch = async (e, values) => {
        e.preventDefault()
        searchProducts(values)
        return <Navigate to={"/"} replace />
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

export default Search