import { Box, Button } from "@material-ui/core";
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
    const { orders, msg, getOrder, deleteOrder } = orderContext

    //hooks
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({})
    const [selectDeleteOrders, setSelectDeleteOrders] = useState([])
    // abre detalles de usuario
    const openUserDetails = (e, product) => {
        setOrder(product)
        setOpen(true);
    }

    const selectOrders = (rows) => setSelectDeleteOrders(rows)

    // boton elimina pedidos
    const deleteClick = () => {

        let ordersId = []

        selectDeleteOrders.forEach(row => ordersId.push({ _id: row._id }))
        // le poaso solos los _id para no tener que pasar los objetos entero
        deleteOrder(ordersId)
    }
    //desabilita el boton de eliminar Imagen 
    const deleteOrderDisabled = () => selectDeleteOrders.length === 0

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
                    onClick: openUserDetails

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
                onSelectionChange={(rows) => selectOrders(rows)}
            />
            <div className={classes.deleteOrder}>
                <Button variant="contained" color="primary" onClick={deleteClick} disabled={deleteOrderDisabled()}>
                    Eliminar Pedidos
                </Button>
            </div>
            {msg ? <SnackbarOpen /> : null}
            <ReusableDialog open={open} onClose={() => setOpen(false)} >
                <UserOrderList order={order} />
            </ReusableDialog>
        </Box>
    );
}

export default Order;