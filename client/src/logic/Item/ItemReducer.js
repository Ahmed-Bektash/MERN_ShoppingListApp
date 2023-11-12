import { ItemActions } from "./ItemActions";


const  ItemReducer= (state,action)=>{

    if(action.type === ItemActions.CLEAR_CART){
        // console.log("in clear cart")
        return ({...state,ItemsArray:[]});
    }
    if(action.type === ItemActions.REMOVE_ITEM){
        return ({...state,ItemsArray:state.ItemsArray.filter((item) => item._id !== action.payload)});
    }
  //can be added to one function with a trigger but i prefer to keep it separate for now
    if(action.type === ItemActions.INCREASE){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if(item._id === action.payload){
                return {...item,amount:item.amount + 1}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
    }
    if(action.type === ItemActions.DECREASE){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if((item._id === action.payload) && (item.amount>1)){
                return {...item,amount:item.amount - 1}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
 
    }
    if(action.type === ItemActions.NOT_FOUND){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if(item._id === action.payload){
                return {...item,notAvailable:!item.notAvailable}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
    }

    if(action.type === ItemActions.DONE){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if(item._id === action.payload){
                return {...item,done:!item.done}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
    }
    
    if(action.type === ItemActions.ADD_ITEM){
        let newArray = state.ItemsArray
            if(action.payload!==''){
                newArray = [...newArray,{_id:action.payload._id,name:action.payload.name,notAvailable: action.payload.notAvailable, amount:action.payload.amount,type:action.payload.type,description: action.payload.description}];
                return {...state, ItemsArray:newArray}
            }else{
           //     console.log("please enter an item");
                return {...state}
            }
    }
    
    if(action.type === ItemActions.DISPLAY){
        return {...state,ItemsArray:action.payload,loading:false}
    }

    if(action.type === ItemActions.EDIT_ITEM){
            if(action.payload!==''){
                const newArray = state.ItemsArray.map((item)=>{
                    let ret_item = {};
                    if(item._id === action.payload._id)
                    {
                        ret_item = {
                            _id:action.payload._id,
                            name:action.payload.name,
                            notAvailable: action.payload.notAvailable,
                            amount:action.payload.amount,
                            type:action.payload.type,
                            description: action.payload.description
                            }
                        
                    }else{
                        ret_item = item;
                    }
                    return ret_item;
                });
                
                return {...state, ItemsArray:newArray}
            }else{
           //     console.log("please enter an item");
                return {...state}
            }
    }
    return state;
}















export default ItemReducer;