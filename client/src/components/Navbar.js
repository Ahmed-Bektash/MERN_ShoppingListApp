import {useState,useContext}from 'react';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Context} from '../logic/DataProvider.js'
export default function NavBar() {
  const theme = useTheme();
  const [IsOpenSideBar, setIsOpenSideBar] = useState(false); //use this for the side bar
  const {ItemsArray,darkMode,ToggleDarkMode} = useContext(Context);
  
  function toggleSideBar(){
        setIsOpenSideBar(!IsOpenSideBar);
    }

  const handleDarkMode=()=>{
    ToggleDarkMode(darkMode ? false : true)
    const newDarkModeState = !darkMode; //because it has no yet been set at this moment
    const expire_time = 10080; //in min --> one week: 10080 min
    const expireBy = new Date(new Date().getTime()+expire_time*60*1000);
    Cookies.set('darkMode',newDarkModeState?'ON':'OFF',{secure:process.env.NODE_ENV==='production',expires:expireBy});
  }

  const DarkModeButton=(props)=> {
    return (props.IsDarkMode ? <LightMode />:<DarkMode />);
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
            onClick ={toggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Number of Items = {ItemsArray.length}
          </Typography>
          <IconButton
              aria-label="expand row"
              size="small"
              color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton onClick={handleDarkMode} color='inherit'>
              <DarkModeButton IsDarkMode={darkMode}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
