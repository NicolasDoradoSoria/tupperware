import { Box } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import OrderContext from '../../context/orderContext/OrderContext'
import Style from "./style";
import SnackbarOpen from "../snackbar/SnackBar";
import MaterialTable from "material-table"
import ReusableDialog from "../reusableDialog/ReusableDialog"
import UserOrderList from "./UserOrderList";
import { PatchedPagination } from '../ProductListManagement/TablePagination'

const columns = () => [
    {

        title: "Nombre User", field: "user.id.firstName",
    },
    {
        title: "Email", field: "user.id.email"
    },
    {
        title: "Estado", field: "status",

    },
    {
        title: "fecha de compra", field: "createdAt", type: 'date'
    },

]

// configuracion de material Table
const options = {
    actionsColumnIndex: -1,
    search: true,
    selection: true,
    headerStyle: {
        backgroundColor: '#249DCD',
        color: 'white',
        fontWeight: 'bold'
    },
    rowStyle: {
        backgroundColor: '#FFF',
        fontSize: '14px'
    },
}

const Order = () => {
    const classes = Style();

    // context Snakbar
    const snackbarContext = useContext(SnackBarContext)
    const { openSnackbar } = snackbarContext

    //context Order
    const orderContext = useContext(OrderContext)
    const { orders, msg, getOrder } = orderContext

    //hooks
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({})
    const getProduct = (e, product) => {
        setOrder(product)
        setOpen(true);
    }

    useEffect(() => {

        getOrder()
        if (msg) {
            openSnackbar(msg.msg, msg.category)
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg])
    return (

        <Box className={classes.root}>
            <MaterialTable title="Pedidos" data={orders} columns={columns()} actions={[
                {
                    icon: "shoppingCart",
                    tooltip: 'ver Productos',
                    position: 'row',
                    onClick: getProduct

                },
            ]}
                components={{
                    Pagination: PatchedPagination,
                }}
                localization={
                    {
                        body: { emptyDataSourceMessage: "No hay pedidos" },
                        header: { actions: "Acciones" }
                    }
                }

                options={
                    options
                }
            />
            {msg ? <SnackbarOpen /> : null}
            <ReusableDialog open={open} onClose={() => setOpen(false)} >
                <UserOrderList order={order} />
            </ReusableDialog>
        </Box>
    );
}

export default Order;