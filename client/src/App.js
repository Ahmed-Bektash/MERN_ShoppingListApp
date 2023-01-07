import React,{useContext} from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList'
import { Context } from './logic/DataProvider';
import NavBar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {theme} from './Theme.js'
import Typography from '@mui/material/Typography';



function App() {
  const {loading}  = useContext(Context)
  // if(loading){
  //   return(
  //     <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}><h1>Loading items please wait...</h1></div>
  //   )
  // }
  
  return (
    <>
    <ThemeProvider theme={theme}>
        <NavBar/>
        <ShoppingList />
        <Typography variant="body2" component="div" sx={{ mt: 2, textAlign:'center', color:'black'}}>
            Developed by A.B @githublink icon
        </Typography>
    </ThemeProvider>
    </>
  );
}

export default App;
