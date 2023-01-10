import React,{useContext} from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList'
import { Context } from './logic/DataProvider';
import NavBar from './components/Navbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const {loading}  = useContext(Context)
  if(loading){
    return(
      <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}><h1>Loading items please wait...</h1></div>
    )
  }
  
  return (
    <>
        <NavBar/>
        <ShoppingList />
        <Typography variant="body2" component="div" sx={{ mt: 2, textAlign:'center', color:'inherit'}}>
            Developed by A.B <GitHubIcon/>
        </Typography>
         </>
  );
}

export default App;
