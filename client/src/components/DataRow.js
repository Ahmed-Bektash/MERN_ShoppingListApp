import React from 'react'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Typography } from '@mui/material';

function DataRow(props) {
    const { row } = props;

  return (
    
    <React.Fragment>
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => row.setOpen(!row.open)}
            >
            {row.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>

        <Container sx={{
                display:'flex',
                justifyContent:"space-between",
                alignItems:"center"
            }}>

                <Typography variant="body2" component="div" paddingLeft={'2rem'}>
                    {row.name}
                </Typography>
                
                <Typography variant="body2" component="div" paddingRight={'2rem'}>
                    {row.amount}    
                </Typography>    

        </Container>

    </React.Fragment>

  )
}

export default DataRow