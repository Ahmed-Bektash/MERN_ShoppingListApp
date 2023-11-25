import React, {useContext, useState} from 'react';
import AddItemButton from './AddItemButton';
import {Context} from '../logic/DataProvider';
import { ClearCart } from '../logic/Item/ItemProvider';
import { Container } from '@mui/material';
import DeleteListButton from './DeleteListButton';
import CustomButton from './CustomButton';
import CopyButton from './CopyButton';
import EditListButton from './EditListButton';


function ShoppingListControlls() {
    const {GlobalState,ItemState,ItemDispatch} = useContext(Context);
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
        <CustomButton 
                variant='outlined' 
                buttonStyles={{backgroundColor:theme=>theme.palette.warning.main}}
                clickHandler={ClearCartHandler}
                text={'Clear List'}
                textStyles={{color:'primary.light'}}
        />
        
        <DeleteListButton listId={GlobalState.curr_list._id} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}/>

        <CopyButton items={ItemState.ItemsArray}/>

        <EditListButton list={GlobalState.curr_list} />

        
        
    </Container>
  )
}

export default ShoppingListControlls