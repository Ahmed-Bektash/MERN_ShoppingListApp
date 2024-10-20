import axios from 'axios';
import { UserActions } from './UserActions';
import { NOTIFICATION_TYPE, NotifyUser } from '../Notification';
import { headersConfig } from '../utils';



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
            email: res.data.message.email,
            token: res.data.message.token
            }
           UserDispatch({type:UserActions.LOAD_USER, payload:userPayload});
      } else {
        NotifyUser(NOTIFICATION_TYPE.ERR,"Sorry, Could not register you at this time.");
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
        NotifyUser(NOTIFICATION_TYPE.ERR,error.response.data.error);
   }

  return false;
}


export const LoginUser = async(UserDispatch,email,password)=>{
    let userPayload = null;
    try {
        localStorage.removeItem("token")
        const res = await axios.post('/api/users/login',
        {
         email:email,
         password:password
         });
        
        if (res.data.message.token) {
            localStorage.setItem("token", res.data.message.token);
            userPayload = {
                username: res.data.message.name,
                email:res.data.message.email,
                token: res.data.message.token,
                lists: res.data.message.lists
            }
            UserDispatch({type:UserActions.LOAD_USER, payload:userPayload});
        } else {
            NotifyUser(NOTIFICATION_TYPE.ERR,res.data.error);
        }
     
       return userPayload;
 
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
         
    NotifyUser(NOTIFICATION_TYPE.ERR,error.response.data.error);    
    }
 
   return null;
 }


 export const AuthUser = async (UserDispatch,token)=>{
    try {
        UserDispatch({type:UserActions.LOADING,payload:true});
        const UserResponse = await fetch('/api/users/me', {
            method: 'GET', // *GET is default anyway
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`
            }});
            
            const user = await UserResponse.json();
            const userpayload = {
                username: user.message.name,
                email: user.message.email,
                token: token,
                lists:user.message.lists
            }
            if(user && userpayload.username)
            {
            //user authenticated
            UserDispatch({type:UserActions.LOAD_USER,payload:userpayload});
          }
          else
          {
            //unauthenticated
            UserDispatch({type:UserActions.LOADING,payload:false});
          }
          
       return user.message;
 
    } catch (error) {
        UserDispatch({type:UserActions.LOADING,payload:false});
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
        
        return undefined;
    
    }
 }

 export const ValidateToken = async (token)=>{
    try {
        const UserResponse = await fetch(`/api/users/verify/${token}`, {
            method: 'GET', // *GET is default anyway
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            }});
            
            const res = await UserResponse.json();
            if(!res.success)
            {
                throw new Error(res.error)
            }
          
       return res.message;
 
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
        
        return undefined;
    
    }
 }

 export const EditUser = async (UserDispatch,updatedUser,type="details")=>{

    const req_body = {
        user: {
            id: updatedUser.id,
            username: updatedUser.name,
            email: updatedUser.email,
            password:updatedUser.password
            },
        type: type
    }
    switch (type) {
        case "verify":
            axios.post(`/api/users/passwordreset`,{'email':req_body.user.email},headersConfig).then(res =>{
                NotifyUser(NOTIFICATION_TYPE.SUCCESS,"Please check your email");
            }).catch(err=>{
                NotifyUser(NOTIFICATION_TYPE.ERR,"failed to process reset password request");
                console.log("Error from [EditUser] with message:",err.message);
                console.log("[EditUser] previous error reason:",err.response.data.message);
                console.log("[EditUser] path:",err.response.data.error);
            });
            break;
        default:
            axios.put(`/api/users/details`,{'user':req_body.user,"type":req_body.type},headersConfig).then(res =>{
                
                if(type !== "password")
                {
                    NotifyUser(NOTIFICATION_TYPE.SUCCESS,"Successfully edited user details!");
                    UserDispatch({type:UserActions.EDIT_USER, payload:req_body});
                }

            }).catch(err=>{
                console.log("Error from [EditUser] with message:",err.message);
            });
           break;
    }
  }