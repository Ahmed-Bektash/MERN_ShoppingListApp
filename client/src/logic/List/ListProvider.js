import axios from 'axios';
import { listActions } from './ListActions';
import { headersConfig } from '../utils';
import { GlobalStateActions } from '../GlobalStateActions';




export const fetchLists = async(ListDispatch,token)=>{
 //fetch lists for the user
 ListDispatch({type:listActions.LOADING});
 const Listresponse = await fetch('/api/lists', {
  method: 'GET', // *GET is default anyway
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`
  }});
  const userLists = await Listresponse.json();
  
  return userLists.message;

}

export const AddList = (ListDispatch,list_details,GlobalDispatch=()=>{})=>{
  
    axios.post('/api/lists',{name:list_details.name,category:list_details.category},headersConfig).then(res =>{
    // console.log(res.data,'from ListDispatcher');
    ListDispatch({type:listActions.ADD_LIST, payload:res.data.message});
    // GlobalDispatch();
    });
  
    
}

export const RemoveList = (ListDispatch,id)=>{
  axios.delete(`/api/lists/${id}`,headersConfig).then(res =>{ 
    ListDispatch({type:listActions.REMOVE_LIST, payload:id}); 
  })
}


export const EditList = (ListDispatch,list_details,GlobalDispatch)=>{

  const req_body = {
      _id: list_details._id,
      name: list_details.name,
      category: list_details.category,
  }
  axios.put(`/api/lists/${list_details._id}`,{'action':listActions.EDIT_LIST,'list':req_body},headersConfig).then(res =>{

      ListDispatch({type:listActions.EDIT_LIST, payload:req_body});
      GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:res.data.message});
  });

}