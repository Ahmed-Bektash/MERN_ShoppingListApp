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
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {Context, ToggleDarkMode} from '../logic/DataProvider.js'
import SideBar from './SideBar.js';
import { isAuthenticated } from '../logic/utils.js';
import { Link } from "react-router-dom";


export default function NavBar() {
  const theme = useTheme();
  const {GlobalState,GlobalDispatch,UserState} = useContext(Context);
  
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
// console.log(GlobalState)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideBar anchor={GlobalState.isMobile?"bottom":"left"} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {GlobalState.curr_list.name? GlobalState.curr_list.name: ""}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {UserState.username?`Hello ${UserState.username}`:""}
          </Typography>
          <Tooltip title={`${isAuthenticated(UserState)?'logout':'login'}`}>
            <Link to={`${isAuthenticated(UserState)?'/':'login'}`} style={{textDecoration:'none', color:theme.palette.secondary.main}}>
              <IconButton
                    aria-label="expand row"
                    size="small"
                    color="inherit"
                    onClick={()=>{
                      if(isAuthenticated(UserState))
                      {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }
                    }}
                    >
                  {isAuthenticated(UserState)?<LogoutIcon />:<LoginIcon />}
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title={`${GlobalState.darkMode?'light mode':'dark mode'}`}>
            <IconButton onClick={handleDarkMode} color='inherit'>
                <DarkModeButton IsDarkMode={GlobalState.darkMode}/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
