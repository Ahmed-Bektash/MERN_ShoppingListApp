import axios from 'axios';
import { GlobalStateActions } from '../GlobalStateActions';
import { ItemActions } from './ItemActions';
import { headersConfig } from '../utils';
import { NOTIFICATION_TYPE, NotifyUser } from '../Notification';


export const CopyItems = (dest_id,items,GlobalDispatch)=>{
    GlobalDispatch({type:GlobalStateActions.LOADING,payload:true});
    axios.post('/api/items/copy',{items:items,destination:dest_id},headersConfig).then(res =>{
        GlobalDispatch({type:GlobalStateActions.LOADING,payload:false});
        NotifyUser(NOTIFICATION_TYPE.SUCCESS,"Copied unique items successfully!");
    });

}

export const ClearCart = (ItemDispatch,listID)=>{
    axios.delete(`/api/items/list/${listID}`,headersConfig).then(res =>{
        // console.log("success");
        ItemDispatch({type:ItemActions.CLEAR_CART});
    })
    // ItemDispatch({type:'CLEAR_CART'});
}

export const removeItem = (ItemDispatch,id)=>{
    axios.delete(`/api/items/${id}`,headersConfig).then(res =>{ 
        ItemDispatch({type:ItemActions.REMOVE_ITEM, payload:id}); 
    })
}

export const increaseItem = (ItemDispatch,id)=>{
    axios.put(`/api/items/${id}`,{'action':ItemActions.INCREASE},headersConfig).then(res =>{
      
        ItemDispatch({type:ItemActions.INCREASE, payload:id});
    })
}

export const decreaseItem = (ItemDispatch,id)=>{ 
    axios.put(`/api/items/${id}`,{'action':ItemActions.DECREASE},headersConfig).then(res =>{
      
        ItemDispatch({type:ItemActions.DECREASE, payload:id});
    })
}

export const toggleNotAvailable = (ItemDispatch,id,notAvailable)=>{
    
    axios.put(`/api/items/${id}`,{notAvailable,'action':ItemActions.NOT_FOUND},headersConfig).then(res =>{ 
        // console.log(notAvailable)
        ItemDispatch({type:ItemActions.NOT_FOUND, payload:id}); 
    })
}

export const toggleDone = (ItemDispatch,id,done)=>{

    axios.put(`/api/items/${id}`,{done,'action':ItemActions.DONE},headersConfig).then(res =>{ 
        ItemDispatch({type:ItemActions.DONE, payload:id}); 

    })
}

export const AddItem = (ItemDispatch,item_details,listID,userID)=>{

    const req_body = {
        name: item_details.name,
        type: item_details.type,
        description: item_details.description,
        amount: item_details.amount,
        list: listID,
        userID:userID,
    }
    
    // console.log(req_body,'from AddItem');
    axios.post('/api/items',{req_body},headersConfig).then(res =>{
        ItemDispatch({type:ItemActions.ADD_ITEM, payload:res.data.message});
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

export const fetchItems = async(ItemDispatch,list_id,token)=>{
   ItemDispatch({type:GlobalStateActions.LOADING});
   const response = await fetch(`/api/items/${list_id}`, {
    method: 'GET', // *GET is default anyway
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }});
   const cartArray = await response.json();
   ItemDispatch({type:ItemActions.DISPLAY,payload:cartArray.message});
   return cartArray.message;
}