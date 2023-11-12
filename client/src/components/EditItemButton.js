import React,{useState,useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Typography from '@mui/material/Typography';
import ShoppingItemForm from './ShoppingItemForm';
import { EditItem } from '../logic/Item/ItemProvider';
import GenericModal from './GenericModal';
import { colourPalette } from '../Theme';

 function EditItemButton({item,EditIcon=undefined}){
    const {ItemDispatch} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }

return(
    <GenericModal 
    btn_style={{backgroundColor:colourPalette.LIGHT_GRAY}} 
    btn_txt={'Edit Item'} 
    open={IsModalOpen} 
    toggle={toggle}
    icon={EditIcon}
    >
        <Typography variant='h2'> Edit this item </Typography>
        <ShoppingItemForm CloseModal={toggle} EndPointFunc={EditItem} item_dispatch={ItemDispatch} InitialStateValues={{name:item.name,type:item.type,description:item.description,amount:item.amount}}/>
       
    </GenericModal>
    );

}

export default EditItemButton;