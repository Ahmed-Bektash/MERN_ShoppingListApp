import React, {useContext} from 'react'
import {Context} from '../logic/DataProvider';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { RemoveList } from '../logic/List/ListProvider';
import { GlobalStateActions } from '../logic/GlobalStateActions';
import { LOCAL_STORAGE_KEYS } from '../config';
import { toast } from 'react-toastify';

function ConfirmDeleteList({listId,confirmDelete,setConfirmDelete}) {
    
    const {GlobalState,GlobalDispatch,ListState,ListDispatch} = useContext(Context);
    

    const DeleteListHandler = ()=>{
        setConfirmDelete(!confirmDelete);
        RemoveList(ListDispatch,listId);
        const display_list = localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_LIST);
        const newList = ListState.ListsArray.find((list)=>list._id === display_list); //make it last curr_list
        GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
        toast.success("List deleted successfully")
    }
    

    const ConfirmDeleteListstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: GlobalState.isMobile?'90%':'40%',
        bgcolor: GlobalState.darkMode?'primary.main':'background.paper',
        boxShadow: 24,
        p: 4,
        border:'none',
        borderRadius:'6px'
      };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={confirmDelete}
        onClose={()=>setConfirmDelete(!confirmDelete)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
        <Fade in={confirmDelete}>
            <Box sx={ConfirmDeleteListstyle}>
                <Typography variant='h2'> 
                    Are you sure you want to delete the list itself, not just its content?
                </Typography>
                <Button onClick={DeleteListHandler} variant='contained' sx={{backgroundColor:theme=>theme.palette.error.main}}>
                    <Typography variant='button' sx={{color:'primary.light'}}>
                        Yes, Delete List
                    </Typography>
                </Button>
            </Box>
        </Fade>
    </Modal>
)
}

export default ConfirmDeleteList