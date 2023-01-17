import * as React from 'react';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {Collapse} from '@mui/material';
import ControlsRow from './ControlsRow';
import DataRow from './DataRow';
import {Context} from '../logic/DataProvider'

function ShoppingListItem(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [rowShow, setRowShow] = React.useState(true);
    const {toggleNotAvailable,toggleFound} = React.useContext(Context);
    const theme = useTheme();
    
    function foundHandler(){
        if(row.notAvailable){
            toggleNotAvailable(row._id,row.notAvailable);
        }
       toggleFound(row._id,row.found);
       setRowShow(!rowShow);
       setOpen(!open);
   } 

   function setColor(){
    let color= '';
    if(row.found){
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
        found:row.found,
        date:row.date,
        open:open,
        setOpen:setOpen,
        foundHandler:foundHandler
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
