import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {Collapse} from '@mui/material';
import ControlsRow from './ControlsRow';
import DataRow from './DataRow';

function ShoppingListItem(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [rowShow, setRowShow] = React.useState(true);
    
  return (
    <Box>
        <Collapse in={rowShow} timeout="auto" unmountOnExit>
            <ListItem>
                <DataRow row={row} open={open} setOpen={setOpen}/>
            </ListItem>
        </Collapse>

        <Divider />
        
        <ListItem>
            <ControlsRow row={row} open={open} setOpen={setOpen} rowShow={rowShow} setRowShow={setRowShow}/>
        </ListItem>
    </Box>

  );
}

export {ShoppingListItem};
