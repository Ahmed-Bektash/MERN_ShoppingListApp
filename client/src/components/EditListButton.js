import React,{useState,useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Typography from '@mui/material/Typography';
import GenericModal from './GenericModal';
import { colourPalette } from '../Theme';
import { EditList } from '../logic/List/ListProvider';
import { ListForm } from './ListForm';

 function EditListButton({list,EditIcon=undefined}){
    const {ListDispatch} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }

return(
    <GenericModal 
    btn_style={{backgroundColor:colourPalette.LIGHT_GRAY}} 
    btn_txt={'Edit List'} 
    open={IsModalOpen} 
    toggle={toggle}
    icon={EditIcon}
    >
        <Typography variant='h2'> Edit this list </Typography>
        <ListForm EndPointFunc={EditList} list_dispatch={ListDispatch} InitialValues={{_id:list._id,name:list.name, category:list.category}} closeModal={toggle}/>
       
    </GenericModal>
    );

}

export default EditListButton;