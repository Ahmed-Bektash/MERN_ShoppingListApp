import { listActions } from "./ListActions";


const  ListReducer= (state,action)=>{

    switch (action.type) {
        case listActions.ADD_LIST:
            
            let newArray = state.ListsArray
            if(action.payload!==''){
                newArray = [...newArray,{_id:action.payload._id,name:action.payload.name,category: action.payload.category, type:action.payload.type}];
                return {...state, ListsArray:newArray}
            }
            else{
           //     console.log("please enter an item");
                return {...state}
            }
        case listActions.DISPLAY_LISTS:
            return {...state,ListsArray:action.payload,loading:false}
        case listActions.LOADING:
            return {...state,loading:true}
    
        default:
            break;
    }

//     if(action.type === 'CLEAR_CART'){
//         console.log("in clear cart")
//         return ({...state,ItemsArray:[]});
//     }
//     if(action.type === 'REMOVE_ITEM'){
//         return ({...state,ItemsArray:state.ItemsArray.filter((item) => item._id !== action.payload)});
//     }
//   //can be added to one function with a trigger but i prefer to keep it separate for now
//     if(action.type === 'INCREASE'){
//         let tempCartItems= state.ItemsArray.map((item)=>{
//             if(item._id === action.payload){
//                 return {...item,amount:item.amount + 1}
//             }
//             return item;
//         })
//         return {...state,ItemsArray:tempCartItems}
//     }
//     if(action.type === 'DECREASE'){
//         let tempCartItems= state.ItemsArray.map((item)=>{
//             if((item._id === action.payload) && (item.amount>1)){
//                 return {...item,amount:item.amount - 1}
//             }
//             return item;
//         })
//         return {...state,ItemsArray:tempCartItems}
 
//     }
//     if(action.type === 'NOT_FOUND'){
//         let tempCartItems= state.ItemsArray.map((item)=>{
//             if(item._id === action.payload){
//                 return {...item,notAvailable:!item.notAvailable}
//             }
//             return item;
//         })
//         return {...state,ItemsArray:tempCartItems}
//     }

//     if(action.type === 'DONE'){
//         let tempCartItems= state.ItemsArray.map((item)=>{
//             if(item._id === action.payload){
//                 return {...item,found:!item.found}
//             }
//             return item;
//         })
//         return {...state,ItemsArray:tempCartItems}
//     }
    
    



    return state;
}















export default ListReducer;