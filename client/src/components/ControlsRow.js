import React,{useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';


function ControlsRow(props) {
    const {row,open,setOpen,rowShow,setRowShow} = props;
    const theme = useTheme();
    const {removeItem,increase,decrease,toggleNotAvailable,toggleFound} = useContext(Context);
    
    function foundHandler(){
        if(row.notAvailable){
            toggleNotAvailable(row.id,row.notAvailable);
        }
       toggleFound(row.id,row.found);
       setRowShow(!rowShow)
    //    setRemove_show(remove_show === 'remove'?'':'remove');
       setOpen(!open);
   }

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="controls">
                <TableHead>
                    <TableRow>
                        <TableCell padding='none'>Found</TableCell>
                        <TableCell padding='none'>Dec</TableCell>
                        <TableCell padding='none'>Inc</TableCell>
                        <TableCell padding='none'>N/A</TableCell>
                        <TableCell padding='none'>Del</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none">
                        < IconButton onClick={() => foundHandler()}>
                            <CheckCircleIcon sx={{color:theme.palette.secondary.main}}  />  
                        </IconButton>
                        </TableCell>    

                        <TableCell padding="none">
                            < IconButton onClick={()=>decrease(row.id)}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                        
                        <TableCell padding="none">
                            < IconButton onClick={()=>increase(row.id)}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton  onClick={()=>toggleNotAvailable(row.id,row.notAvailable)}>
                                <ErrorOutlineIcon sx={{color:theme.palette.error.main}} />
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton onClick={()=>removeItem(row.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell> 
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    </Collapse>
  )
}

export default ControlsRow