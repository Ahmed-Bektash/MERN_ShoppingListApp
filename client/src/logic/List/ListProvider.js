import axios from 'axios';
import { listActions } from './ListActions';


// export const ClearCart = (ItemDispatch)=>{
//     axios.delete(`/api/items`).then(res =>{
//         // console.log("success");
//         ItemDispatch({type:'CLEAR_CART'});
//     })
//     // ItemDispatch({type:'CLEAR_CART'});
// }

// export const removeItem = (ItemDispatch,id)=>{
//     axios.delete(`/api/items/${id}`).then(res =>{ 
//         ItemDispatch({type:'REMOVE_ITEM', payload:id}); 
//     })
// }

// export const increaseItem = (ItemDispatch,id)=>{
//     axios.put(`/api/items/${id}`,{'action':'INC'}).then(res =>{
      
//         ItemDispatch({type:'INCREASE', payload:id});
//     })
// }

// export const decreaseItem = (ItemDispatch,id)=>{ 
//     axios.put(`/api/items/${id}`,{'action':'DEC'}).then(res =>{
      
//         ItemDispatch({type:'DECREASE', payload:id});
//     })
// }

// export const toggleNotAvailable = (ItemDispatch,id,notAvailable)=>{
    
//     axios.put(`/api/items/${id}`,{notAvailable,'action':'NA'}).then(res =>{ 
//         // console.log(notAvailable)
//         ItemDispatch({type:'NOT_FOUND', payload:id}); 
//     })
// }

// export const toggleFound = (ItemDispatch,id,found)=>{

//     axios.put(`/api/items/${id}`,{found,'action':'DONE'}).then(res =>{ 
//         ItemDispatch({type:'DONE', payload:id}); 
//     })
// }

export const AddList = (ListDispatch,name,category,type)=>{
    
    axios.post('/api/lists',{name:name,category:category,type:type}).then(res =>{
    // console.log(res.data,'from ListDispatcher');
    ListDispatch({type:listActions.ADD_LIST, payload:res.data});
    });
  
    
}

export const fetchLists = async(ListDispatch)=>{
 
   ListDispatch({type:listActions.LOADING});
   const response = await fetch('/api/lists', {
    method: 'GET', // *GET is default anyway
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    }});
   const cartArray = await response.json();
   ListDispatch({type:listActions.DISPLAY_LISTS,payload:cartArray});

}