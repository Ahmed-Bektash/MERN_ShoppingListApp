import React from 'react'
import { Outlet } from "react-router-dom";
import ShoppingList from '.././components/ShoppingList'
import NavBar from '.././components/Navbar';
import Footer from '../components/Footer';


function MainPage() {
  return (
    <>
       <NavBar/>
       <div className='selected_list'>
            <Outlet />
       </div>
        {/* <ShoppingList /> */}
        <Footer />
        
    </>
  )
}

export default MainPage