import React, {useContext} from 'react';
// import {Container, ListGroup, Button} from 'reactstrap';
// import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Context} from '../logic/DataProvider';
import {ListItem} from './ListItem';
import Modal from './modal';
import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import ShoppingListTable from './Table';


function createData(name, amount) {
    return { name, amount };
  }
  
  const rows = [
    createData('Frozen yoghurt', 1),
    createData('Ice cream sandwich',2),
    createData('Eclair', 3),
    createData('Cupcake', 4),
    createData('Gingerbread', 500),
  ];

function ShoppingList (){
    const {ItemsArray,ClearCart} = useContext(Context);
    const theme = useTheme();

   // console.log(ItemsArray);
//    if(ItemsArray.length ===0){
//     return(
//        <Container style ={{display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column',marginTop:'10rem'}}>
//        <section>
//        <header >
//             <h1> The cart is empty</h1>
//         </header>
//         </section>
     
//      {/* <Button 
//      color = "dark" 
//      style={{marginTop:'2rem',marginLeft:'45%'}}
//      onClick={()=>{
//          const name = prompt('enter item'); //temporary
//          AddItem(name);
//      }}
//      >
//          Add Item
//      </Button> */}
//      <Modal />
//      </Container>
//     );
// }

    return(
        
        <Box>

            <Container>
            {/* <Modal /> */}
            </Container>
            
            <Container sx={{mt:4}}>
                <ShoppingListTable rows={rows} />
            </Container>
        
        </Box>
       
        );
        

    }
    
export default ShoppingList;