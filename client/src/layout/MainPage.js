import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import { Context } from '../logic/DataProvider';
import Typography from '@mui/material/Typography';
import {useTheme } from '@mui/material/styles';
import { isAuthenticated } from '../logic/utils';
import Dashboard from './Dashboard';




function MainPage() {
  const theme = useTheme();
  const { UserState} = useContext(Context);
  
  return (
    <>
       {
        isAuthenticated(UserState)?      
          <Dashboard />
       :
       !localStorage.getItem("token")?
       <Link to={"/login"} style={{textDecoration:"none"}} >
       <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
         You are not signed in, please login
       </Typography>
     </Link>
     :
     <div>Loading user, please wait ...</div>
      }
        <Footer />
        
    </>
  )
}

export default MainPage