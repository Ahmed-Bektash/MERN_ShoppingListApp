import React, {useContext, useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {Context} from '../logic/DataProvider';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { RemoveList } from '../logic/List/ListProvider';
import { GlobalStateActions } from '../logic/GlobalStateActions';

function ConfirmDeleteList({listId,confirmDelete,setConfirmDelete}) {
    
    const {GlobalState,GlobalDispatch,ListState,ListDispatch} = useContext(Context);
    const [lastLocation,setLastLocation] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const DeleteListHandler = ()=>{
        setConfirmDelete(!confirmDelete);
        // RemoveList(ListDispatch,listId);
        GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:ListState.ListsArray[0]});
        navigate(`/lists/${GlobalState.curr_list.category}/${GlobalState.curr_list._id}`);
    }

    // useEffect(() => {
    //   console.log("location changed",location)
    //   const currPathname = location.pathname;
    //   if(lastLocation != currPathname){
    //     console.log("new location")
    //     setLastLocation(location.pathname)
    //     console.log(ListState.ListsArray)
    //     const nextList = ListState.ListsArray.find((list)=>(list?list._id:'') === currPathname.split('/')[-1])
    //     GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:nextList});
    //   }


    // }, [location])
    

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