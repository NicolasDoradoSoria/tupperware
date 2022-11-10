import { Card, CardContent, Typography } from "@material-ui/core";
import Style from "./Style";

const Notification = () => {
    const classes = Style();
    return (
        <Card className={classes.root}>
            <CardContent >
                <Typography variant="h5" component="h2">
                    PAGADO
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Notification;