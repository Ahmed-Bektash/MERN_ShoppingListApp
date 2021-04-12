import React,{useContext} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/appNavbar'
import ShoppingList from './components/ShoppingList'
import { Context } from './components/DataProvider';



function App() {
  const {loading}  = useContext(Context)
  if(loading){
    return(
      <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}><h1>Loading items please wait...</h1></div>
    )
  }
  
  return (
    <>
    <AppNavbar />
  
    <ShoppingList />
    </>
  );
}

export default App;
