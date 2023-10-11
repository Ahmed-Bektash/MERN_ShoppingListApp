import React, {useContext,useEffect, useState} from 'react'
import { Context } from '../logic/DataProvider';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from '.././components/Navbar';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { PAGE_REF } from '../config';
import { fetchItems } from '../logic/Item/ItemProvider';
import { headersConfig } from '../logic/utils';

function Dashboard() {
  const {GlobalState,UserState,ItemDispatch} = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(GlobalState.curr_list._id)
    {
      navigate(`/user/lists/${GlobalState.curr_list.category.toLowerCase()}/${GlobalState.curr_list._id.toLowerCase()}`,{state:{from:PAGE_REF.DASHBOARD}});
      // console.log("fetching items for the current list") //renders twice: tried use call back and use memo to no benefit
      fetchItems(ItemDispatch,GlobalState.curr_list._id,UserState.token);
    }
    else{
      navigate(`/`,{state:{from:PAGE_REF.DASHBOARD}});

    }
    
  }, [GlobalState.curr_list])

  useEffect(() => {
      if((location.state.from === PAGE_REF.LOGIN) || (location.state.from === PAGE_REF.SIGNUP))
      {
        toast.success("Signed in successfully!")
      }

  },[location.state])
  
  
  return (
    <>
      {GlobalState.loading?
        <Loading/>
        :
        <div className='selected_list'>
          <NavBar/>
          <Outlet />
        </div>
      }

    </>
  )
}

export default Dashboard