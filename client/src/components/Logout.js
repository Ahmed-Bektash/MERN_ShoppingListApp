import {useContext}from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { BUTTON_SHAPE, PAGE_REF } from '../config.js';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserActions } from '../logic/User/UserActions.js';
import { listActions } from '../logic/List/ListActions.js';
import {Context} from '../logic/DataProvider.js'
import { isAuthenticated } from '../logic/utils.js';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

function Logout(props) {
  const {shape} = props
  const theme = useTheme();
  const navigate = useNavigate();
  const {UserState,UserDispatch,ListDispatch} = useContext(Context);
  
  
  return (
    <Tooltip title={`${isAuthenticated(UserState)?'logout':'login'}`}>
            <Link
             to={`${isAuthenticated(UserState)?'/':'login'}`} 
             style={{textDecoration:'none', color:theme.palette.secondary.main}}
             state={{ from: PAGE_REF.DASHBOARD}}
             >
              <IconButton
                    aria-label="expand row"
                    size="small"
                    color="inherit"
                    onClick={()=>{
                      if(isAuthenticated(UserState))
                      {
                        localStorage.removeItem("token");
                        UserDispatch({type:UserActions.CLEAR_USER});
                        ListDispatch({type:listActions.CLEAR_LIST})
                        toast.success("Signed out!")
                        navigate(`/`,{state:{from:PAGE_REF.DASHBOARD}});
                      }
                    }}
                    >
                  
              
              {(shape === BUTTON_SHAPE.ICON) ? <LogoutIcon /> : <Button variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}> Logout</Button>}
              </IconButton>
            </Link>
          </Tooltip>
  )
}

export default Logout