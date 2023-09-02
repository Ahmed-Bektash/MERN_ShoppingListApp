import axios from 'axios';
import { GlobalStateActions } from '../GlobalStateActions';
import { ItemActions } from './ItemActions';


export const ClearCart = (ItemDispatch,listID)=>{
    axios.delete(`/api/items/list/${listID}`).then(res =>{
        // console.log("success");
        ItemDispatch({type:ItemActions.CLEAR_CART});
    })
    // ItemDispatch({type:'CLEAR_CART'});
}

export const removeItem = (ItemDispatch,id)=>{
    axios.delete(`/api/items/${id}`).then(res =>{ 
        ItemDispatch({type:'REMOVE_ITEM', payload:id}); 
    })
}

export const increaseItem = (ItemDispatch,id)=>{
    axios.put(`/api/items/${id}`,{'action':'INC'}).then(res =>{
      
        ItemDispatch({type:'INCREASE', payload:id});
    })
}

export const decreaseItem = (ItemDispatch,id)=>{ 
    axios.put(`/api/items/${id}`,{'action':'DEC'}).then(res =>{
      
        ItemDispatch({type:'DECREASE', payload:id});
    })
}

export const toggleNotAvailable = (ItemDispatch,id,notAvailable)=>{
    
    axios.put(`/api/items/${id}`,{notAvailable,'action':'NA'}).then(res =>{ 
        // console.log(notAvailable)
        ItemDispatch({type:'NOT_FOUND', payload:id}); 
    })
}

export const toggleFound = (ItemDispatch,id,found)=>{

    axios.put(`/api/items/${id}`,{found,'action':'DONE'}).then(res =>{ 
        ItemDispatch({type:'DONE', payload:id}); 
    })
}

export const AddItem = (ItemDispatch,name,amount,listID,userID)=>{
    
    // console.log(listID,'from AddItem');
    axios.post('/api/items',{name:name,amount:amount,list:listID,userID:userID}).then(res =>{
    ItemDispatch({type:ItemActions.ADD_ITEM, payload:res.data});
    });

    /**************************METHOD 2******************************/
    //works.

    // axios({
    //     method: 'post',
    //     url: '/api/items',
    //     data: {
    //       name:name
    //     }
    //   });
    //   ItemDispatch({type:'ADD_ITEM', payload:{name}});

    /**************************METHOD 3******************************/
        //does not work, needs debugging

    // const response = await fetch('/api/items', {
    //     method: 'POST', // *GET is default anyway
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'String'
    //     },
    //     body: `${name}`
    // });
    //    const resname = await response.json();
    //    console.log(resname,'from ItemDispatcher');
    //    ItemDispatch({type:'ADD_ITEM', payload:resname}); 

  
    
}

export const fetchItems = async(ItemDispatch,list_id)=>{
   ItemDispatch({type:GlobalStateActions.LOADING});
   const response = await fetch(`/api/items/${list_id}`, {
    method: 'GET', // *GET is default anyway
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    }});
   const cartArray = await response.json();
   ItemDispatch({type:ItemActions.DISPLAY,payload:cartArray});

}