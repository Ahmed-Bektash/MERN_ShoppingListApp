import React, {useContext} from 'react';
import {ListGroupItem,Container, Button,Form,Input} from 'reactstrap';
import {Context} from './DataProvider'

function ListItem ({id,name,NotFound,amount,status}){
    const {removeItem,increase,decrease,ToggleNotFound,setStatus} = useContext(Context);
    // const [done,setDone] = useState(false);

    function SubmitHandler(){
       setStatus(id,status);
        if(NotFound){
            ToggleNotFound(id,NotFound);
        }
        
   }
   function setColor(){
       let color= '';
       if(status){
           color=  'gray';
       }else if(NotFound){
           color = 'red';
       }else{
           color = 'black';
       }
       return color;
   }

return(
    <ListGroupItem style ={{display:'flex' ,alignItems:'center',justifyContent:'space-around',backgroundColor:`${status? 'lightGray':'white'}`}}>
         <Button 
        className="remove-btn"
        color ="danger"
        style={{marginLeft:'0.5rem'}}
        size="sm"
        /******  old way was to fildter here, new way is to usereducer and filter using context api ****/
        //onClick ={()=>{
        //  let newArray = ItemsArray.filter(item=>item.id!=id);
        //  setItemsArray(newArray);
        // }}
        onClick={()=>removeItem(id)}
        >
        &times;
        </Button>
        <Form
        style={{marginLeft:'2rem'}}
        >
             <Input
             type="checkbox"
             onChange = {SubmitHandler} />
             Done?
           
        </Form>
        <Container style ={{display:'flex', justifyContent:'center', color: `${setColor()}`,textDecoration:`${status? 'line-through':'none'}`}} >
            {name}
        </Container>

      <Container style ={{display:'flex', justifyContent:'space-around'}}>
        
      <Button 
        className="NA-btn"
        style ={{marginRight:'1rem'}}
        color ="primary"
        size="sm"
        /******  old way was to filter here, new way is to usereducer and filter using context api ****/
        //onClick ={()=>{
        //  let newArray = ItemsArray.filter(item=>item.id!=id);
        //  setItemsArray(newArray);
        // }}
        onClick={()=>ToggleNotFound(id,NotFound)}
        >
        N/A
        </Button>

        <Button 
        className="add-btn"
        color ="success"
        style ={{marginRight:'0.5rem'}}
        size="sm"
        /******  old way was to fildter here, new way is to usereducer and filter using context api ****/
        //onClick ={()=>{
        //  let newArray = ItemsArray.filter(item=>item.id!=id);
        //  setItemsArray(newArray);
        // }}
        onClick={()=>increase(id)}
        >
        +
        </Button>
        <span style ={{alignSelf:'center',marginRight:'0.5rem'}}> {amount} </span>
        <Button 
        className="subtract-btn"
        color ="warning"
        size="sm"
        style ={{color:'white'}}
        /******  old way was to fildter here, new way is to usereducer and filter using context api ****/
        //onClick ={()=>{
        //  let newArray = ItemsArray.filter(item=>item.id!=id);
        //  setItemsArray(newArray);
        // }}
        onClick={()=>decrease(id)}
        >
        -
        </Button>
        </Container>
        </ListGroupItem> 
);

}

export {ListItem};