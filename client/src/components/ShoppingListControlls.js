import React, {useContext, useState} from 'react';
import AddItemButton from './AddItemButton';
import {Context} from '../logic/DataProvider';
import { ClearCart } from '../logic/Item/ItemProvider';
import { Button, Container, Typography } from '@mui/material';
import ConfirmDeleteList from './ConfirmDeleteList';


function ShoppingListControlls() {
    const {GlobalState,ItemDispatch} = useContext(Context);
    const [confirmDelete,setConfirmDelete] = useState(false);
   
    const constainer_styles = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap:2,
        alignItems: 'center',
        justifyContent: GlobalState.isMobile?'center':'flex-start'
    }

    const ClearCartHandler = ()=>{
        ClearCart(ItemDispatch,GlobalState.curr_list._id);
    }
  return (
    <Container disableGutters sx={constainer_styles}>

        <AddItemButton />
        
        <Button onClick={ClearCartHandler} variant='outlined' sx={{backgroundColor:theme=>theme.palette.warning.main}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Clear List
            </Typography>
        </Button>

        <Button onClick={()=>setConfirmDelete(!confirmDelete)} variant='outlined' sx={{backgroundColor:theme=>theme.palette.error.main}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Delete List
            </Typography>
        </Button>
        <ConfirmDeleteList listId={GlobalState.curr_list._id} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}/>
    </Container>
  )
}

export default ShoppingListControlls