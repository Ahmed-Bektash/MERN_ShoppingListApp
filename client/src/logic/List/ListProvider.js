import axios from 'axios';
import { listActions } from './ListActions';
import { headersConfig } from '../utils';



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

export const fetchLists = async(ListDispatch)=>{
 
  ListDispatch({type:listActions.LOADING});
  const response = await fetch('/api/lists', {
   method: 'GET', // *GET is default anyway
   mode: 'cors', // no-cors, *cors, same-origin
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, *same-origin, omit
   headers: {
     'Content-Type': 'application/json',
     'authorization': `Bearer ${localStorage.getItem("token")}`
   }});
  const userLists = await response.json();
  ListDispatch({type:listActions.DISPLAY_LISTS,payload:userLists.message});

}

export const AddList = (ListDispatch,name,category,type)=>{
    
    axios.post('/api/lists',{name:name,category:category,type:type},headersConfig).then(res =>{
    // console.log(res.data,'from ListDispatcher');
    ListDispatch({type:listActions.ADD_LIST, payload:res.data.message});
    });
  
    
}

export const RemoveList = (ListDispatch,id)=>{
  axios.delete(`/api/lists/${id}`,headersConfig).then(res =>{ 
    ListDispatch({type:listActions.REMOVE_LIST, payload:id}); 
  })
}