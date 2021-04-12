import React, {useEffect, createContext,useReducer} from 'react'
import reducer from './reducer'
import { v4 as uuidv4 } from 'uuid';

 export const Context = createContext();

 const initialState = {
     ItemsArray:[
     {id:uuidv4(), name: "milk", NotFound: false,amount:1},
     {id:uuidv4(), name: "eggs", NotFound: false,amount:1},
     {id:uuidv4(), name: "juice", NotFound: false,amount:1}],
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
        dispatch({type:'CLEAR_CART'});
    }
    const removeItem = (id)=>{
        dispatch({type:'REMOVE_ITEM', payload:id});
    }
    const increase = (id)=>{
        dispatch({type:'INCREASE', payload:id});
    }
    const decrease = (id)=>{
        dispatch({type:'DECREASE', payload:id});
    }
    const ToggleNotFound = (id)=>{
        dispatch({type:'NOT_FOUND', payload:id});
    }
    const AddItem = (name)=>{
        dispatch({type:'ADD_ITEM', payload:name});
    }
//    const fetchData = async()=>{
//       let data = [{id:1,name:'milk',NotFound:false,amount:1}]
//        dispatch({type:'LOADING'});
//        const response = await fetch(data);
//        //const cartArray = await response.json();
//        dispatch({type:'DISPLAY',payload:data});
//    }
//    useEffect(()=>{
//     fetchData();
//    },[]);
    // value={{ItemsArray, setItemsArray,total,setTotal,calculatetotal}}
    return(
        <Context.Provider value={{...state,ClearCart,removeItem,increase,decrease,ToggleNotFound,AddItem}}>
            {children}
        </Context.Provider>
    )
}



