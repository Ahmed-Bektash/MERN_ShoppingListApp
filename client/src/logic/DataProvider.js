import React, {useEffect, createContext,useReducer} from 'react'
import reducer from './reducer'
import axios from 'axios';
import useWindowDimensions from './utils'
import Cookies from 'js-cookie';

 export const Context = createContext();

 const initialState = {
     ItemsArray:[],
     loading:false,
     darkMode:false,
     userLoggedIn:true, //later get it from cookies,
    // userInfo: Cookies.get('userInfo')
    //   ? JSON.parse(Cookies.get('userInfo'))
    //   : null,
    // feature_Config:{ // This is used to enable/disable some features entirely

    // }
 }

//  function createData(id,name,amount,notFound,found) {
//     return { id,name,amount,notFound,found };
//   }
export const Provider = ({children}) =>{

    // const [ItemsArray, setItemsArray] = useState([
    //     createData(1,'Frozen yoghurt', 10,false,false),
    //     createData(2,'Ice cream sandwich',20,false,false),
    //     createData(3,'Eclair', 30,false,false),
    //     createData(4,'Cupcake', 40,false,false),
    //     createData(5,'Gingerbread', 500,false,false),
    //   ]);
 // const [total,setTotal] = useState(0);
    
    // function calculatetotal(){
    //     let sum = 0;   
    //     for (let i= 0;i<ItemsArray.length;i++){
    //         sum +=1;
    //     }
    //     setTotal(sum);
    //    }
    
    const [state,dispatch] = useReducer(reducer,initialState); //looks for reducer function and initial state
    const {WindowWidth} = useWindowDimensions();

    const isMobile = (WindowWidth <= 700 ? true : false);
    

    const ToggleDarkMode = (isDarkModeRequested)=>{
        dispatch({type:'DARK',payload:isDarkModeRequested});
    }

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

    const setStatus = (id,status)=>{

        axios.put(`/api/items/${id}`,{status,'action':'DONE'}).then(res =>{ 
            dispatch({type:'DONE', payload:id}); 
        })
    }

    const AddItem = (name,amount)=>{
        
        axios.post('/api/items',{name:name,amount:amount}).then(res =>{
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
    const client_cookies= Cookies.get();
    dispatch({type: 'DARK',payload:client_cookies['darkMode'] === 'ON'? true : false});
    fetchData();

   },[]);
    
    return(
        <Context.Provider value={{...state,isMobile,ClearCart,removeItem,increase,decrease,ToggleNotFound,AddItem,setStatus,ToggleDarkMode}}>
            {children}
        </Context.Provider>
    )
}



