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
import { decreaseItem, increaseItem,toggleNotAvailable, removeItem } from '../logic/Item/ItemProvider';


function ControlsRow(props) {
    const {row} = props;
    const theme = useTheme();
    const {ItemDispatch} = useContext(Context);
    

  return (
    <Collapse in={row.open} timeout="auto" unmountOnExit sx={{width:"100%"}}>
        <Box sx={{ margin: 1}}>
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
                        < IconButton onClick={() => row.foundHandler()}>
                            <CheckCircleIcon sx={{color:theme.palette.secondary.main}}  />  
                        </IconButton>
                        </TableCell>    

                        <TableCell padding="none">
                            < IconButton onClick={()=>decreaseItem(ItemDispatch,row.id)}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                        
                        <TableCell padding="none">
                            < IconButton onClick={()=>increaseItem(ItemDispatch,row.id)}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton  onClick={()=>toggleNotAvailable(ItemDispatch,row.id,row.notAvailable)}>
                                <ErrorOutlineIcon sx={{color:theme.palette.error.main}} />
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton onClick={()=>removeItem(ItemDispatch,row.id)}>
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