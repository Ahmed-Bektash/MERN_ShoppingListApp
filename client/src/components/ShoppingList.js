import React, {useContext} from 'react';
import {Context} from '../logic/DataProvider';
import Modal from './modal';
import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import ShoppingListTable from './Table';


function createData(id,name,amount,notFound,found) {
    return { id,name,amount,notFound,found };
  }
  
  const rows = [
    createData(1,'Frozen yoghurt', 10,false,false),
    createData(2,'Ice cream sandwich',20,false,false),
    createData(3,'Eclair', 30,false,false),
    createData(4,'Cupcake', 40,false,false),
    createData(5,'Gingerbread', 500,false,false),
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
        <Container sx={{mt:4}}>
            <Modal />
        </Container>
        
        <Container sx={{mt:2}}>
            <ShoppingListTable rows={rows} />
        </Container> 
    </Box>
       
        );
        

    }
    
export default ShoppingList;