import {useContext}from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { BUTTON_SHAPE, LOCAL_STORAGE_KEYS, PAGE_REF } from '../config.js';
import { useNavigate } from "react-router-dom";
import { UserActions } from '../logic/User/UserActions.js';
import { listActions } from '../logic/List/ListActions.js';
import {Context} from '../logic/DataProvider.js'
import { isAuthenticated } from '../logic/utils.js';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification.js';

function Logout(props) {
  const {shape} = props
  const theme = useTheme();
  const navigate = useNavigate();
  const {GlobalState,UserState,UserDispatch,ListDispatch} = useContext(Context);
  
  const logOutHandler = ()=>{
    if(isAuthenticated(UserState))
    {
      localStorage.removeItem("token");
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURR_LIST,GlobalState.curr_list._id);

      UserDispatch({type:UserActions.CLEAR_USER});
      ListDispatch({type:listActions.CLEAR_LIST});
      NotifyUser(NOTIFICATION_TYPE.SUCCESS,`See you soon ${UserState.username}!`);
      navigate(`/`,{state:{from:PAGE_REF.DASHBOARD}});
    }
  }

  return (
    <Tooltip title={`${isAuthenticated(UserState)?'logout':'login'}`}>
            <Link
             to={`${isAuthenticated(UserState)?'/':'login'}`} 
             style={{textDecoration:'none', color:theme.palette.secondary.main}}
             state={{ from: PAGE_REF.DASHBOARD}}
             >

              {
                (shape === BUTTON_SHAPE.ICON) ? 
                
                  <IconButton aria-label="expand row" size="small" color="inherit" onClick={logOutHandler}>
                    <LogoutIcon />
                  </IconButton>
                : 
                  <Button
                  variant="contained" 
                  sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}
                  onClick={logOutHandler}
                  >
                    Logout
                  </Button>
              }
            </Link>
          </Tooltip>
  )
}

export default Logout