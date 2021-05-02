import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../title/Title';
import Style from './Style';

//TODO: falta la fecha
const PriceProduct = ({price}) => {
    const classes = Style();
    return (
      <Fragment>
        <Title>Recent Deposits</Title>
        <Typography component="p" variant="h4">
          {price}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          on 15 March, 2019
        </Typography>
        
      </Fragment>
    );
}
 
export default PriceProduct;