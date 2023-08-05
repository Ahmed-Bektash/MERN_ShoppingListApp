import React, {useContext, useState} from 'react';
import ItemModal from './ItemModal';
import {Context} from '../logic/DataProvider';
import { ClearCart } from '../logic/Item/ItemProvider';
import { Button, Typography } from '@mui/material';
import ConfirmDeleteList from './ConfirmDeleteList';


function ShoppingListControlls() {
    const {GlobalState,ItemDispatch} = useContext(Context);
    const [confirmDelete,setConfirmDelete] = useState(false);
   

    const ClearCartHandler = ()=>{
        ClearCart(ItemDispatch,GlobalState.curr_list._id);
    }

  return (
    <React.Fragment>
        
        <ItemModal />
        
        <Button onClick={ClearCartHandler} variant='outlined' sx={{backgroundColor:theme=>theme.palette.warning.main,ml:'1rem'}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Clear List
            </Typography>
        </Button>

        <Button onClick={()=>setConfirmDelete(!confirmDelete)} variant='outlined' sx={{backgroundColor:theme=>theme.palette.error.main,ml:'1rem'}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Delete List
            </Typography>
        </Button>
        <ConfirmDeleteList listId={GlobalState.curr_list._id} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}/>
    </React.Fragment>
  )
}

export default ShoppingListControlls