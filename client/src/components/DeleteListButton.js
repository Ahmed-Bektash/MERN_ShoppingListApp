import React, {useContext} from 'react'
import {Context} from '../logic/DataProvider';
import { Button, Typography } from '@mui/material';
import { RemoveList } from '../logic/List/ListProvider';
import { GlobalStateActions } from '../logic/GlobalStateActions';
import { LOCAL_STORAGE_KEYS } from '../config';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';
import GenericModal from './GenericModal';

function DeleteListButton({listId,confirmDelete,setConfirmDelete}) {
    
    const {GlobalDispatch,ListState,ListDispatch} = useContext(Context);
    
    const DeleteListHandler = ()=>{
        setConfirmDelete(!confirmDelete);
        RemoveList(ListDispatch,listId);
        const display_list = localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_LIST);
        const newList = ListState.ListsArray.find((list)=>list._id === display_list); //make it last curr_list
        GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
        NotifyUser(NOTIFICATION_TYPE.SUCCESS,"List deleted successfully");
    }
    
  return (
    <GenericModal btn_style={{backgroundColor:theme=>theme.palette.error.main}} btn_txt={'Delete list'} toggle={()=>setConfirmDelete(!confirmDelete)} open={confirmDelete}>
        <Typography variant='h2'> 
            Are you sure you want to delete the list itself, not just its content?
        </Typography>
        <Button onClick={DeleteListHandler} variant='contained' sx={{backgroundColor:theme=>theme.palette.error.main}}>
            <Typography variant='button' sx={{color:'primary.light'}}>
                Yes, Delete List
            </Typography>
        </Button>
    </GenericModal>
)
}

export default DeleteListButton