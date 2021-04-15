

const  reducer= (state,action)=>{

    if(action.type === 'CLEAR_CART'){
        return ({...state,ItemsArray:[]});
    }
    if(action.type === 'REMOVE_ITEM'){
        return ({...state,ItemsArray:state.ItemsArray.filter((item) => item._id !== action.payload)});
    }
  //can be added to one function with a trigger but i prefer to keep it separate for now
    if(action.type === 'INCREASE'){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if(item.id ===action.payload){
                return {...item,amount:item.amount + 1}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
    }
    if(action.type === 'DECREASE'){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if((item.id ===action.payload) && (item.amount>1)){
                return {...item,amount:item.amount - 1}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}

    }
    if(action.type === 'NOT_FOUND'){
        let tempCartItems= state.ItemsArray.map((item)=>{
            if(item.id ===action.payload){
                return {...item,NotFound:!item.NotFound}
            }
            return item;
        })
        return {...state,ItemsArray:tempCartItems}
    }
    
    if(action.type === 'ADD_ITEM'){
        let newArray = state.ItemsArray
            if(action.payload!==''){
                newArray = [...newArray,{_id:action.payload._id,name:action.payload.name,NotFound: action.payload.NotFound, amount:action.payload.amount}];
                return {...state, ItemsArray:newArray}
            }else{
           //     console.log("please enter an item");
                return {...state}
            }
    }
    if(action.type ==='LOADING'){
        return {...state,loading:true}
    }
    if(action.type ==='DISPLAY'){
        return {...state,ItemsArray:action.payload,loading:false}
    }


    return state;
}















export default reducer;