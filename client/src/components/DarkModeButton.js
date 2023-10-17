import {useContext}from 'react';
import {Context, ToggleDarkMode} from '../logic/DataProvider.js'
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip';

function DarkModeButton() {
  const {GlobalState,GlobalDispatch} = useContext(Context);
  const handleDarkMode=()=>{
        ToggleDarkMode(GlobalDispatch,GlobalState.darkMode ? false : true)
        const newDarkModeState = !GlobalState.darkMode; //because it has no yet been set at this moment
        const expire_time = 10080; //in min --> one week: 10080 min
        const expireBy = new Date(new Date().getTime()+expire_time*60*1000);
        Cookies.set('darkMode',newDarkModeState?'ON':'OFF',{secure:process.env.NODE_ENV==='production',expires:expireBy});
      }

      const DarkModeIcon=(props)=> {
        return (props.IsDarkMode ? <LightMode />:<DarkMode />);
      }
  return (
    <Tooltip title={`${GlobalState.darkMode?'light mode':'dark mode'}`}>
    <IconButton onClick={handleDarkMode} color='inherit'>
        <DarkModeIcon IsDarkMode={GlobalState.darkMode}/>
    </IconButton>
  </Tooltip>
  )
}

export default DarkModeButton