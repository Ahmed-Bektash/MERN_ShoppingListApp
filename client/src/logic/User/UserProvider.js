import axios from 'axios';
import { UserActions } from './UserActions';



export const RegisterUser = async(UserDispatch,name,email,role,password)=>{
    
   try {
       const res = await axios.post('/api/users/register',
       {
        name:name,
        email:email,
        role:role,
        password:password
        });
       
       if (res.data.message.token) {
           localStorage.setItem("token", res.data.message.token);
           const userPayload = {
            username: res.data.message.name,
            token: res.data.message.token
            }
           UserDispatch({type:UserActions.LOAD_USER, payload:userPayload});
        // toast.success("Logged in Successfully");
      } else {
        // toast.error(parseRes);
      }
    
      return true;

   } catch (error) {
    if (error.response) { // status code out of the range of 2xx
        console.log("Data :" , error.response.data);
        console.log("Status :" + error.response.status);
        } 
    else if (error.request) { // The request was made but no response was received
        console.log("Request :",error.request);
        } 
    else{// Error on setting up the request
        console.log('Error', error.message);
        }
   }

  return false;
}


export const LoginUser = async(UserDispatch,email,password)=>{
    
    try {
        localStorage.removeItem("token")
        const res = await axios.post('/api/users/login',
        {
         email:email,
         password:password
         });
        
        if (res.data.message.token) {
            localStorage.setItem("token", res.data.message.token);
            const userPayload = {
                username: res.data.message.name,
                token: res.data.message.token,
                lists: res.data.message.lists
            }
            UserDispatch({type:UserActions.LOAD_USER, payload:userPayload});
           // toast.success("Logged in Successfully");
       } else {
         // toast.error(parseRes);
       }
     
       return true;
 
    } catch (error) {
     if (error.response) { // status code out of the range of 2xx
         console.log("Data :" , error.response.data);
         console.log("Status :" + error.response.status);
         } 
     else if (error.request) { // The request was made but no response was received
         console.log("Request :",error.request);
         } 
     else{// Error on setting up the request
         console.log('Error', error.message);
         }
    }
 
   return false;
 }