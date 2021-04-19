import React, {useEffect, createContext,useReducer} from 'react'
import reducer from './reducer'
import axios from 'axios';

 export const Context = createContext();

 const initialState = {
     ItemsArray:[],
     loading:false,
 }

export const Provider = ({children}) =>{
    // const [ItemsArray, setItemsArray] = useState([
    //     {id:uuidv4(), name: "milk", IsComplete: false},
    //     {id: uuidv4(), name: "eggs", IsComplete: false},
    //     {id:uuidv4(), name: "juice", IsComplete: false}
    // ]);
 // const [total,setTotal] = useState(0);
    
    // function calculatetotal(){
    //     let sum = 0;   
    //     for (let i= 0;i<ItemsArray.length;i++){
    //         sum +=1;
    //     }
    //     setTotal(sum);
    //    }
    
    const [state,dispatch] = useReducer(reducer,initialState); //looks for reducer function and initial state
    
    const ClearCart = ()=>{
        axios.delete(`/api/items`).then(res =>{
            // console.log("success");
            dispatch({type:'CLEAR_CART'});
        })
        // dispatch({type:'CLEAR_CART'});
    }
    const removeItem = (id)=>{
        axios.delete(`/api/items/${id}`).then(res =>{ 
            dispatch({type:'REMOVE_ITEM', payload:id}); 
        })
    }
    const increase = (id)=>{
        axios.put(`/api/items/${id}`,{'action':'INC'}).then(res =>{
          
            dispatch({type:'INCREASE', payload:id});
        })
    }
    const decrease = (id)=>{ 
        axios.put(`/api/items/${id}`,{'action':'DEC'}).then(res =>{
          
            dispatch({type:'DECREASE', payload:id});
        })
    }
    const ToggleNotFound = (id,NotFound)=>{
        
        axios.put(`/api/items/${id}`,{NotFound,'action':'NA'}).then(res =>{ 
            // console.log(NotFound)
            dispatch({type:'NOT_FOUND', payload:id}); 
        })
    }

    const AddItem = (name)=>{
        // console.log(name);
        // console.log(typeof name);
        axios.post('/api/items',{name:name}).then(res =>{
        // console.log(res.data,'from dispatcher');
        dispatch({type:'ADD_ITEM', payload:res.data});
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
        //   dispatch({type:'ADD_ITEM', payload:{name}});

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
        //    console.log(resname,'from dispatcher');
        //    dispatch({type:'ADD_ITEM', payload:resname}); 

      
        
    }

   const fetchData = async()=>{
     
       dispatch({type:'LOADING'});
       const response = await fetch('/api/items', {
        method: 'GET', // *GET is default anyway
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        }});
       const cartArray = await response.json();
       dispatch({type:'DISPLAY',payload:cartArray});
   }
   useEffect(()=>{
    fetchData();
   },[]);
    
    return(
        <Context.Provider value={{...state,ClearCart,removeItem,increase,decrease,ToggleNotFound,AddItem}}>
            {children}
        </Context.Provider>
    )
}



