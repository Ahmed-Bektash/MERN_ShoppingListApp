import React, {useContext} from 'react';
import {Context} from '../logic/DataProvider'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';


function ListItem(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const {removeItem,increase,decrease,ToggleNotFound,setStatus} = useContext(Context);

    const rowItems= {
        id: row._id,
        name:row.name,
        amount:row.amount,
        notFound:row.NotFound,
        found: row.found
    }


    function foundHandler(){
       setStatus(rowItems.id,rowItems.found);
        if(rowItems.notFound){
            ToggleNotFound(rowItems.id,rowItems.notFound);
        }
        
   }
   function setColor(){
       let color= '';
       if(rowItems.found){
           color=  theme.palette.secondary.main;
       }else if(rowItems.notFound){
           color = theme.palette.secondary.light;
       }else{
           color = 'inherit';
       }
       return color;
   }


    return(
        <React.Fragment>
                <TableRow 
                hover={setColor() === 'inherit'}
                sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    height:'4rem',
                    backgroundColor:setColor()
                       
                }}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    
                    <TableCell component="th" scope="row" padding="none">
                        <Typography variant="body2" component="div">
                            {row.name}
                        </Typography>
                    </TableCell>
                        
                    
                    <TableCell padding="none" align='center'>
                        <Typography variant="body2" component="div">
                            {row.amount}    
                        </Typography>
                    </TableCell>
                           
                </TableRow>
                
                <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                            < IconButton onClick={()=>decrease(rowItems.id)}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                        
                        <TableCell padding="none">
                            < IconButton onClick={()=>increase(rowItems.id)}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton  onClick={()=>ToggleNotFound(rowItems.id,rowItems.notFound)}>
                                <ErrorOutlineIcon sx={{color:theme.palette.error.main}} />
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton onClick={()=>removeItem(rowItems.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell> 
                        </TableRow>
                    </TableBody>
                </Table>
                </Box>
                </Collapse>
                </TableCell>
                </TableRow>
                </React.Fragment>
    )
}

export {ListItem};
