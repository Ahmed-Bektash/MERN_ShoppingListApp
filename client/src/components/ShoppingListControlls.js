import React, {useContext} from 'react';
import ItemModal from './ItemModal';
import { Button, Typography } from '@mui/material';
import {Context} from '../logic/DataProvider';

function ShoppingListControlls() {
    const {ClearCart} = useContext(Context);

  return (
    <React.Fragment>
        <ItemModal />
        <Button onClick={ClearCart} variant='outlined' sx={{backgroundColor:theme=>theme.palette.error.main,ml:'1rem'}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Clear List
            </Typography>
        </Button>
    </React.Fragment>
  )
}

export default ShoppingListControlls