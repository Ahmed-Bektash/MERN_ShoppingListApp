import React,{useState,useContext} from 'react'
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {Context} from './DataProvider'

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


    return(
        <div>
            <Button 
         color = "dark" 
         style={{marginTop:'2rem'}}
        onClick={toggle}
        >
        Add item
     </Button>

     <Modal
     isOpen = {IsModalOpen}
     toggle = {toggle}
     >
        <ModalHeader toggle = {toggle}>Add item to shopping List</ModalHeader>
        <ModalBody>
            <Form onSubmit = {SubmitHandler}>
                <FormGroup>
                    <Label for="item">What do you want to buy?</Label>
                    <Input
                    type= "text"
                    name = "" //will be updated with change handler to match input
                    id = "item"
                    placeholder = "add item here"
                    onChange = {ChangeHandler}
                    style = {{borderBlockStyle:'double' ,borderColor: `${ModalError? 'red':'gray'}`}}
                    >
                    </Input>
                    <Button
                    color ="dark"
                    style ={{marginTop: '2rem'}}
                    block
                    >
                        save
                    </Button>
                </FormGroup>
            </Form>
        </ModalBody>

     </Modal>


        </div>

    );

}

export default CartModal;