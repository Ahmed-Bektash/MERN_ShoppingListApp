import React,{useState,useContext} from 'react'
// import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {Context} from '../logic/DataProvider'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';

 function CartModal(){
    const {AddItem} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    const [ItemName,SetName] = useState("");
    const [ModalError,SetModalError] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }
    function ChangeHandler(e){
        SetModalError(false);
       e.target.name = e.target.value;
       SetName(e.target.name);
       
    }

    function SubmitHandler(e){
        e.preventDefault(); 
        //Add the item to the shopping list usting context
    
    
        if(ItemName){ 
            AddItem(ItemName); //Item name is from change handler
            //  //close the modal
            toggle();
            //resetname to start over next time modal is opened  
            SetName("");
        }else{
            SetModalError(true);
        }
        

    }

    const Modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
                </Fade>
            </Modal>
        </>
    //  <Modal
    //  isOpen = {IsModalOpen}
    //  toggle = {toggle}
    //  >
    //     <ModalHeader toggle = {toggle}>Add item to shopping List</ModalHeader>
    //     <ModalBody>
    //         <Form onSubmit = {SubmitHandler}>
    //             <FormGroup>
    //                 <Label for="item">What do you want to buy?</Label>
    //                 <Input
    //                 type= "text"
    //                 name = "" //will be updated with change handler to match input
    //                 id = "item"
    //                 placeholder = "add item here"
    //                 onChange = {ChangeHandler}
    //                 style = {{borderBlockStyle:'double' ,borderColor: `${ModalError? 'red':'gray'}`}}
    //                 >
    //                 </Input>
    //                 <Button
    //                 color ="dark"
    //                 style ={{marginTop: '2rem'}}
    //                 block
    //                 >
    //                     save
    //                 </Button>
    //             </FormGroup>
    //         </Form>
    //     </ModalBody>

    //  </Modal>

    );

}

export default CartModal;