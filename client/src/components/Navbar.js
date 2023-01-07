import {useState,useContext}from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import {Context} from '../logic/DataProvider.js'

export default function NavBar() {
  const theme = useTheme();
  const [IsOpen, setIsOpen] = useState(false); //use this for the side bar
  const {ItemsArray} = useContext(Context)
  function toggle(){
        setIsOpen(!IsOpen);
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 ,color:theme.palette.secondary.main}}
            onClick ={toggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Number of Items = {ItemsArray.length}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
