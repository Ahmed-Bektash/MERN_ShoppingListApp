import React,{useContext} from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList'
import { Context } from './logic/DataProvider';
import NavBar from './components/Navbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';
import {Provider} from './logic/DataProvider'
import Layout from './Theme.js'

function App() {

// @TODO: Add layout folder then include this as a component in the app structure  
  // if(GlobalState.loading){
  //   return(
  //     <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}><h1>Loading items please wait...</h1></div>
  //   )
  // }
  
  return (

     <Provider>
      <Layout>
        <NavBar/>
        <ShoppingList />
        <Typography variant="body2" component="div" sx={{ mt: 2, textAlign:'center', color:'inherit'}}>
            Developed by A.B @ <Link sx={{color:'inherit'}} target= '_' href = 'https://github.com/Ahmed-Bektash/MERN_ShoppingListApp'> <GitHubIcon sx={{height:'1.2rem'}}/> </Link>
        </Typography>
      </Layout>
    </Provider>
    
  );
}

export default App;
