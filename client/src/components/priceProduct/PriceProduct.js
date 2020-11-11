import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../title/Title';
import Style from './Style';

const PriceProduct = () => {
    const classes = Style();
    return (
      <Fragment>
        <Title>Recent Deposits</Title>
        <Typography component="p" variant="h4">
          $3,024.00
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          on 15 March, 2019
        </Typography>
        
      </Fragment>
    );
}
 
export default PriceProduct;