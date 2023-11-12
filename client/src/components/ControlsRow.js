import React,{useContext} from 'react'
import {Context} from '../logic/DataProvider'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@emotion/react';
import { decreaseItem, increaseItem,toggleNotAvailable, removeItem } from '../logic/Item/ItemProvider';
import CopyButton from './CopyButton'
import {ICONS, ITEM_TYPES} from '../config'
import CustomButton from './CustomButton';
import { Typography } from '@mui/material';
import EditItemButton from './EditItemButton';

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
                        <TableCell padding='none'>Done</TableCell>
                        { (row.type === ITEM_TYPES.SHOPPING) &&
                        <>
                            <TableCell padding='none'>Dec</TableCell>
                            <TableCell padding='none'>Inc</TableCell>
                            <TableCell padding='none'>N/A</TableCell>
                        </>
                        }
                        <TableCell padding='none'>Del</TableCell>
                        <TableCell padding='none'>Copy</TableCell>
                        <TableCell padding='none'>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none">
                        <CustomButton 
                            clickHandler={() => row.foundHandler()}
                            icon={ICONS.DONE}
                            buttonStyles={{color:theme.palette.secondary.main}}
                        />
                        </TableCell>    
                        { (row.type === ITEM_TYPES.SHOPPING) &&
                            <>
                        <TableCell padding="none">
                            <CustomButton 
                                clickHandler={()=>decreaseItem(ItemDispatch,row.id)}
                                icon={ICONS.DECREASE}
                            />
                        </TableCell>
                        
                        <TableCell padding="none">
                            <CustomButton 
                                clickHandler={()=>increaseItem(ItemDispatch,row.id)}
                                icon={ICONS.INCREASE}
                            />
                        </TableCell>

                        <TableCell padding="none">
                            <CustomButton 
                                clickHandler={()=>toggleNotAvailable(ItemDispatch,row.id,row.notAvailable)}
                                icon={ICONS.NA}
                                buttonStyles={{color:theme.palette.error.main}}
                            />
                        </TableCell>
                        </>
                        }
                        <TableCell padding="none">
                            <CustomButton 
                                clickHandler={()=>removeItem(ItemDispatch,row.id)}
                                icon={ICONS.DEL}
                            />
                        </TableCell> 

                        <TableCell padding="none">
                            <CopyButton items={[row]} copyIcon={ICONS.COPY}/>
                        </TableCell> 

                        <TableCell padding="none">
                            <EditItemButton item={row} EditIcon={ICONS.EDIT}/>
                        </TableCell> 
                    </TableRow>
                    
                    {row.description &&
                        <>
                        <TableRow>
                            <TableCell padding='none' colSpan={7} sx={{fontWeight:'bold'}}>Description</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none" colSpan={7}>
                                    {row.description.split("\n").map(line=>
                                        <Typography variant='body2' key={line} mt={1} mb={1}>
                                            {line}
                                        </Typography>
                                    )}
                            </TableCell> 
                        </TableRow>
                        </>
                    }
                </TableBody>
            </Table>
        </Box>
    </Collapse>
  )
}

export default ControlsRow