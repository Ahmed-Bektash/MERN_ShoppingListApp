import React, {useContext,useEffect,useState} from 'react';
import {Context} from '../logic/DataProvider';
import { Box, Container, Typography,Button } from '@mui/material';
import ShoppingListTable from './ShoppingListTable';
import ShoppingListControlls from './ShoppingListControlls';
import ItemModal from './ItemModal';
import ConfirmDeleteList from './ConfirmDeleteList';

//The following rows are for DEV testing only
// function createData(id,name,amount,notAvailable,found) {
//     return { id,name,amount,notAvailable,found };
//   }
  
//   const rows = [
//     createData(1,'Frozen yoghurt', 10,false,false),
//     createData(2,'Ice cream sandwich',20,false,false),
//     createData(3,'Eclair', 30,false,false),
//     createData(4,'Cupcake', 40,false,false),
//     createData(5,'Gingerbread', 500,false,false),
//   ];

function ShoppingList (){
    const {ItemState,GlobalState} = useContext(Context);
    const [foundArray,setFoundArray] = useState([]);
    const [mainCart,setMainCart] = useState([]);
    const [confirmDeleteList,setConfirmDeleteList] = useState(false);

    useEffect(() => {
        // console.log(ItemsArray)
        setFoundArray(()=>[]);
        setMainCart(()=>[]);
        ItemState.ItemsArray.forEach(element => {
            if(element.found === true)
            {
                //add it to found array
                setFoundArray(arr=>[...arr,element]);
            }
            else
            {
                //add it to main
                setMainCart(arr=>[...arr,element])
            }
            
        });

    }, [ItemState.ItemsArray,GlobalState.curr_list]);


    
    

    if(ItemState.ItemsArray.length ===0){
        return (
            <Box>
                <Container sx={{mt:4, display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                    <Typography variant='h2'>The cart is empty</Typography>
                    
                    <Container sx={{mt:1, display:"flex",justifyContent:"center", alignItems:"center"}}>
                        <ItemModal />
                        <Button onClick={()=>setConfirmDeleteList(!confirmDeleteList)} variant='outlined' sx={{backgroundColor:theme=>theme.palette.error.main,ml:'1rem'}}>
                            <Typography variant='button' sx={{color:'primary.light'}}>
                                Delete List
                            </Typography>
                        </Button>
                        <ConfirmDeleteList listId={GlobalState.curr_list._id} confirmDelete={confirmDeleteList} setConfirmDelete={setConfirmDeleteList}/>
                    </Container>
                </Container>
            </Box>
        )
    }
    else
    {
    
        return(
            
            <Box>
            { !GlobalState.isMobile && 
            <Container sx={{mt:4}}>
                <ShoppingListControlls />
            </Container>}
            
            <Container sx={{mt:2}}>
                <ShoppingListTable rows={mainCart} title="Title of shopping list"/>
            </Container>

            {GlobalState.isMobile && 
            <Container sx={{mt:2}}>
                <ShoppingListControlls />
            </Container>} 

            <Container sx={{mt:10}}>
                <ShoppingListTable rows={foundArray} title="Found List"/>
            </Container>
        </Box>
        
        
        );
        
       
    }
}
    
export default ShoppingList;