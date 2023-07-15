import React from 'react'
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';

function Footer() {
  return (
    <Typography variant="body2" component="div" sx={{ mt: 2, textAlign:'center', color:'inherit'}}>
            Developed by A.B @ <Link sx={{color:'inherit'}} target= '_' href = 'https://github.com/Ahmed-Bektash/MERN_ShoppingListApp'> <GitHubIcon sx={{height:'1.2rem'}}/> </Link>
    </Typography>
  )
}

export default Footer