import {useContext}from 'react';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Context, ToggleDarkMode} from '../logic/DataProvider.js'
import SideBar from './SideBar.js';


export default function NavBar() {
  const theme = useTheme();
  const {GlobalState,GlobalDispatch} = useContext(Context);
  
  const handleDarkMode=()=>{
    ToggleDarkMode(GlobalDispatch,GlobalState.darkMode ? false : true)
    const newDarkModeState = !GlobalState.darkMode; //because it has no yet been set at this moment
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
          <SideBar anchor={GlobalState.isMobile?"bottom":"left"} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {GlobalState.curr_list.name? GlobalState.curr_list.name: ""}
          </Typography>
          <IconButton
              aria-label="expand row"
              size="small"
              color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton onClick={handleDarkMode} color='inherit'>
              <DarkModeButton IsDarkMode={GlobalState.darkMode}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
