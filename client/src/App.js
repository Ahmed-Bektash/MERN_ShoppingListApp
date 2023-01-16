import React,{useContext} from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList'
import { Context } from './logic/DataProvider';
import NavBar from './components/Navbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
import SelectedList from './components/SelectedList';

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
        {/* <ShoppingList /> */}
        <SelectedList />
        <Typography variant="body2" component="div" sx={{ mt: 2, textAlign:'center', color:'inherit'}}>
            Developed by A.B @ <Link sx={{color:'inherit'}} target= '_' href = 'https://github.com/Ahmed-Bektash/MERN_ShoppingListApp'> <GitHubIcon sx={{height:'1.2rem'}}/> </Link>
        </Typography>
         </>
  );
}

export default App;
