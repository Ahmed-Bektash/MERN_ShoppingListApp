import React,{useState,useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Typography from '@mui/material/Typography';
import ShoppingItemForm from './ShoppingItemForm';
import { AddItem } from '../logic/Item/ItemProvider';
import GenericModal from './GenericModal';

 function AddItemButton(){
    const {ItemDispatch} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }

return(
    <GenericModal 
    btn_style={{backgroundColor:theme=>theme.palette.secondary.main}} 
    btn_txt={'Add Item'} 
    open={IsModalOpen} 
    toggle={toggle}
    >
        <Typography variant='h2'> What would you like to add? </Typography>
        <ShoppingItemForm CloseModal={toggle} AddItem={AddItem} item_dispatch={ItemDispatch}/>
    </GenericModal>
    );

}

export default AddItemButton;