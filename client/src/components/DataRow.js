import React from 'react'
import { useTheme } from '@emotion/react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, ListItem, Typography } from '@mui/material';

function DataRow(props) {
    const { row, open, setOpen} = props;
    const theme = useTheme();
    // const [remove_show,setRemove_show] = React.useState('');
    
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

  return (
    
    <React.Fragment>
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>

        <Container sx={{
                display:'flex',
                justifyContent:"space-between",
                alignItems:"center"
            }}>

                <Typography variant="body2" component="div">
                    {row.name}
                </Typography>
                
                <Typography variant="body2" component="div">
                    {row.amount}    
                </Typography>    

        </Container>

    </React.Fragment>

  )
}

export default DataRow