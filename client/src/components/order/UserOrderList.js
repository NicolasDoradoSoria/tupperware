import { Grid, Typography } from "@material-ui/core"
import MaterialTable from "material-table"
import moment from "moment";
import Style from "./style";
import { PatchedPagination } from '../ProductListManagement/TablePagination'

const columns = () => [
    {

        title: "Nombre User", field: "id.name",
    },
    {
        title: "price", field: "id.price", type: "currency"
    },
    {
        title: "cantidad", field: "quantity", type: 'numeric'
    },

]

// configuracion de material Table
const options = {
    actionsColumnIndex: -1,
    search: false,
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

const UserOrderList = ({ order }) => {
    const classes = Style();
    return (
        <div className={classes.orderContainerRoot}>

            <Grid container>

                <Grid item xs={6}>
                    <Typography variant="h3">
                        Usuario {order.user.id.firstName}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h3">
                        {moment(order.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                    <MaterialTable title="Pedido Usuario " data={order.products} columns={columns()}
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
                </Grid>
            </Grid>
        </div>

    );
}

export default UserOrderList;