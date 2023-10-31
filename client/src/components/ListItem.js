import * as React from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {Collapse} from '@mui/material';
import ControlsRow from './ControlsRow';
import DataRow from './DataRow';
import {Context} from '../logic/DataProvider'
import { toggleDone, toggleNotAvailable } from '../logic/Item/ItemProvider';

function ShoppingListItem(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [rowShow, setRowShow] = React.useState(true);
    const {ItemDispatch} = React.useContext(Context);
    const theme = useTheme();
    
    function doneHandler(){
        console.log(row)
        if(row.notAvailable){
            toggleNotAvailable(ItemDispatch,row._id,row.notAvailable);
        }
       toggleDone(ItemDispatch,row._id,row.done);
       setRowShow(!rowShow);
       setOpen(!open);
   } 

   function setColor(){
    let color= '';
    if(row.done){
        color=  theme.palette.secondary.main;
    }else if(row.notAvailable){
        color = theme.palette.secondary.light;
    }else{
        color = 'inherit';
    }
    return color;
}

    const rowProps = {
        id:row._id,
        name:row.name,
        notAvailable:row.notAvailable,
        amount:row.amount,
        type:row.type,
        description:row.description,
        done:row.done,
        date:row.date,
        open:open,
        setOpen:setOpen,
        foundHandler:doneHandler
    }
  
    
  return (
    <Box>
        <Collapse in={rowShow} timeout="auto" unmountOnExit >
            <ListItem sx={{backgroundColor:setColor()}}>
                <DataRow row={rowProps}/>
            </ListItem>
        </Collapse>

        {rowShow && <Divider />}
        
        <ListItem>
            <ControlsRow row={rowProps}/>
        </ListItem>
    </Box>

  );
}

export {ShoppingListItem};
