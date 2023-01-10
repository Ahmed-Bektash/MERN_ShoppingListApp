import React, {useContext} from 'react';
import {Context} from '../logic/DataProvider';
import Modal from './modal';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import ShoppingListTable from './Table';

//The following rows are for DEV testing only
// function createData(id,name,amount,notFound,found) {
//     return { id,name,amount,notFound,found };
//   }
  
//   const rows = [
//     createData(1,'Frozen yoghurt', 10,false,false),
//     createData(2,'Ice cream sandwich',20,false,false),
//     createData(3,'Eclair', 30,false,false),
//     createData(4,'Cupcake', 40,false,false),
//     createData(5,'Gingerbread', 500,false,false),
//   ];

function ShoppingList (){
    const {ItemsArray,isMobile,ClearCart} = useContext(Context);

    if(ItemsArray.length ===0){
        return (
            <Box>
                <Container sx={{mt:4, display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                    <Typography variant='h2'>The cart is empty</Typography>
                    <Modal />
                </Container>
            </Box>
        )
    }
    else
    {
    
        return(
            
            <Box>
            { !isMobile && <Container sx={{mt:4}}>
                <Modal />
            </Container>}
            
            <Container sx={{mt:2}}>
                <ShoppingListTable rows={ItemsArray} />
            </Container>

            {isMobile && <Container sx={{mt:4}}>
                <Modal />
            </Container>} 
        </Box>
        
        );
        
       
    }
}
    
export default ShoppingList;