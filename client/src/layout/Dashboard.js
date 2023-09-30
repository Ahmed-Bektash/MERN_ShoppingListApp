import React, {useContext,useEffect} from 'react'
import { Context } from '../logic/DataProvider';
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from '.././components/Navbar';

function Dashboard() {
  const { GlobalState} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if(GlobalState.curr_list._id)
    {
      navigate(`/user/lists/${GlobalState.curr_list.category.toLowerCase()}/${GlobalState.curr_list._id.toLowerCase()}`);
    }
    else{
      navigate(`/`);

    }
    
  }, [GlobalState.curr_list])
  return (
    <div className='selected_list'>
      <NavBar/>
      <Outlet />
    </div>
  )
}

export default Dashboard