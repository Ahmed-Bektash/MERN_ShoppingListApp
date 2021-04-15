import React, {useContext} from 'react';
import {Container, ListGroup, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Context} from './DataProvider';
import {ListItem} from './ListItem';
import Modal from './modal';

function ShoppingList (){
    const {ItemsArray,ClearCart} = useContext(Context);
   // console.log(ItemsArray);
   if(ItemsArray.length ===0){
    return(
       <Container style ={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column',marginTop:'10rem'}}>
       <section>
       <header >
            <h1> The cart is empty</h1>
        </header>
        </section>
     
     {/* <Button 
     color = "dark" 
     style={{marginTop:'2rem',marginLeft:'45%'}}
     onClick={()=>{
         const name = prompt('enter item'); //temporary
         AddItem(name);
     }}
     >
         Add Item
     </Button> */}
     <Modal />
     </Container>
    );
}

    return(
        
        <Container>

            {/* <Button 
            color = "dark" 
            style={{marginBottom:'2rem'}}
            onClick={()=>{
                const name = prompt('enter item'); //temporary
                AddItem(name);
                /***********************************************OLD WAY *********************
                // let newArray = ItemsArray.map((item)=>{
                //     return item;
                // });
                // if(name){
                //     newArray = [...newArray,{id:uuidv4(),name:name}];
                //     setItemsArray(newArray);
                //     console.log(ItemsArray);
                // }
            //}}
           // >Add Item</Button>
             */}
             <Container style={{marginBottom:'2rem',display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column'}} >
             <Modal />
             </Container>

            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {ItemsArray.map(({_id,name,NotFound,amount})=>( //destructure to avoid list.id and list.name later
                       
                       <CSSTransition key={_id} timeout={300} classNames="fade">
                            <ListItem id={_id} name={name} NotFound= {NotFound} amount={amount}/>
                        </CSSTransition>

                    ))}
                    </TransitionGroup>
            </ListGroup>
            
            <Button 
                className="remove-btn"
                style={{marginTop:'2rem',marginBottom:'2rem'}}
                color ="danger"
                size="md"
                block
                onClick ={ClearCart}
                >
                &times; CLEAR ALL
            </Button>
        </Container>
    );


}

export default ShoppingList;