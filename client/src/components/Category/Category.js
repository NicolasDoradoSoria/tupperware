import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useContext, useState, useEffect } from "react";
import CategoryContext from "../../context/categoryContext/CategoryContext";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import SnackbarOpen from "../snackbar/SnackBar";
import Style from "./Style";

const Category = () => {
    const classes = Style();

    //contextContext
    const categoryContext = useContext(CategoryContext);
    const { addCategory, msg, categories, getCategory,deleteCategory } = categoryContext;

    // context Snakbar
    const snackbarContext = useContext(SnackBarContext)
    const { openSnackbar } = snackbarContext

    // hoox
    const [category, setCategory] = useState({ name: "" })
    const [selectCategory, setSelectCategory] = useState("")

    const categoryChange = (e) => setCategory({[e.target.name]: e.target.value,});
    
    const submitAddCategory = (e) => {
        e.preventDefault();
        addCategory(category)
        setCategory({
            name: ""
        })
    }

    const submitDeleteCategory = (e) => {
        e.preventDefault();
        deleteCategory(selectCategory)
        setSelectCategory("")
    }
    const handleChangeCategory= (e) => setSelectCategory(e.target.value);
    
    useEffect(() => {
        if (msg) openSnackbar(msg.msg, msg.category)

        getCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg])

    return (
        <Card className={classes.root}>
            <form>
                <CardContent>
                    <Typography variant="h4" className={classes.title}>
                        Agregar Categoria
                    </Typography>

                    <Grid container spacing={3} className={classes.mainContainer}>
                        <Grid item xs={6}>
                            <TextField label="nombre de la categoria" variant="outlined" fullWidth onChange={categoryChange} name="name" value={category.name} />
                        </Grid>

                        <Grid item xs={6} className={classes.buttonConteiner}>
                            <Button variant="contained" color="primary" onClick={submitAddCategory}>
                                agregar Categoria
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Typography variant="h4" className={classes.title}>
                        Eliminar Categoria
                    </Typography>

                    <Grid container spacing={3} className={classes.mainContainer}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Categoria</InputLabel>
                                <Select value={selectCategory} onChange={handleChangeCategory} >
                                    {categories.map((category) => (
                                        <MenuItem value={category._id} key={category._id} >{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} className={classes.buttonConteiner}>
                            <Button variant="contained" color="primary" onClick={submitDeleteCategory}>
                                eliminar Categoria
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </form>
            {msg ? <SnackbarOpen /> : null}
        </Card>
    );
}

export default Category;