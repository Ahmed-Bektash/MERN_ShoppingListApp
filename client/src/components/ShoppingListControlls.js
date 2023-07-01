import React, {useContext} from 'react';
import ItemModal from './ItemModal';
import { Button, Typography } from '@mui/material';
import {Context} from '../logic/DataProvider';
import { ClearCart } from '../logic/Item/ItemProvider';

function ShoppingListControlls() {
    const {ItemDispatch} = useContext(Context);

    const ClearCartHandler = ()=>{
        ClearCart(ItemDispatch)
    }

  return (
    <React.Fragment>
        <ItemModal />
        <Button onClick={ClearCartHandler} variant='outlined' sx={{backgroundColor:theme=>theme.palette.error.main,ml:'1rem'}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Clear List
            </Typography>
        </Button>
    </React.Fragment>
  )
}

export default ShoppingListControlls