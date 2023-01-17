import React,{useState,useContext} from 'react'
// import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {Context} from '../logic/DataProvider'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ShoppingItemForm from './ShoppingItemForm';

 function ItemModal(){
    const {darkMode,isMobile,AddItem} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }

    const Modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile?'90%':'40%',
        bgcolor: darkMode?'primary.main':'background.paper',
        boxShadow: 24,
        p: 4,
        border:'none',
        borderRadius:'6px'
      };

return(
       <>
            <Button onClick={toggle} variant='outlined' sx={{backgroundColor:theme=>theme.palette.secondary.main}}>
                <Typography variant='button' sx={{color:'primary.light'}}>
                    Add Item
                </Typography>
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={IsModalOpen}
                onClose={toggle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                >
                <Fade in={IsModalOpen}>
                <Box sx={Modalstyle}>
                    <Typography variant='h2'> What would you like to add? </Typography>
                    <ShoppingItemForm CloseModal={toggle} AddItem={AddItem} />
                </Box>
                </Fade>
            </Modal>
        </>
    );

}

export default ItemModal;