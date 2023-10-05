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
        case listActions.REMOVE_LIST:            
            return {...state,ListsArray:state.ListsArray.filter((list) => list._id !== action.payload)};
        case listActions.LOADING:
            return {...state,loading:true}
        case listActions.CLEAR_LIST:
            return {
                ListsArray:[],
                loading:false
            }
    
        default:
            break;
    }
    



    return state;
}















export default ListReducer;