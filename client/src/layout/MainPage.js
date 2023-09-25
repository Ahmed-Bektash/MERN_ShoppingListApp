import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import ShoppingList from '.././components/ShoppingList'
import NavBar from '.././components/Navbar';
import Footer from '../components/Footer';
import { Context } from '../logic/DataProvider';



function MainPage() {
  const { GlobalState} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if(GlobalState.curr_list._id)
    {
      navigate(`/lists/shopping/${GlobalState.curr_list._id}`);
    }
    
  }, [GlobalState.curr_list])
  
  
  return (
    <>
       <NavBar/>
       <div className='selected_list'>
            <Outlet />
       </div>
        <Footer />
        
    </>
  )
}

export default MainPage