import React, { useContext, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLoaderData } from "react-router-dom";
import ShoppingList from '.././components/ShoppingList'
import NavBar from '.././components/Navbar';
import Footer from '../components/Footer';
import { Context, fetchUserData } from '../logic/DataProvider';
import Typography from '@mui/material/Typography';
import {useTheme } from '@mui/material/styles';




function MainPage() {
  const theme = useTheme();
  const { GlobalState,UserState} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if(GlobalState.curr_list._id)
    {
      navigate(`/lists/${GlobalState.curr_list.category}/${GlobalState.curr_list._id}`);
    }
    else{
      navigate(`/`);

    }
    
  }, [GlobalState.curr_list])
  
  return (
    <>
      <NavBar/>
       {
         (UserState.token)? //not isAuthenticated() because we need the user to be loaded
            (UserState.isAuth)?
              
                <div className='selected_list'>
                    <Outlet />
                </div>
              :
              <div>Loading user...</div>
       :
       <Link to={"/login"} style={{textDecoration:"none"}} >
       <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
         You are not signed in, please login
       </Typography>
     </Link>
      }
        <Footer />
        
    </>
  )
}

export default MainPage