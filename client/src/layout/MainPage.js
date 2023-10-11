import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../logic/DataProvider';
import Typography from '@mui/material/Typography';
import {useTheme } from '@mui/material/styles';
import { isAuthenticated } from '../logic/utils';
import Dashboard from './Dashboard';
import { Button, Container } from '@mui/material';
import { PAGE_REF } from '../config';



function MainPage() {
  const theme = useTheme();
  const {UserState} = useContext(Context);
  
  return (
    <>
      {
        isAuthenticated(UserState)?
          <Dashboard />
       :
       !UserState.isLoading?
       <Container sx={{display:"flex", alignItems:"center", justifyContent:"center",flexDirection:"column", height:"80vh"}}>
          <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
            You are not signed in
          </Typography>
          <Link 
          to={"/login"} 
          style={{textDecoration:"none"}} 
          state={{ from: PAGE_REF.MAIN}}
          >
          <Button type='primary' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mt:2,mb:2}}>Go to login page</Button>
          </Link>
       </Container>
     :
        <div>Loading user, please wait ...</div>
      }
        
    </>
  )
}

export default MainPage