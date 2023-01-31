import User from "../models/User.js";
import { DB_verifyUser } from "./VerifyUser.js";

export default async function Delete(deletable,deleter,type){
   
switch(type){

    case "user":
        try {
              const verifiedUser =  await DB_verifyUser(deletable,"ID");

              if((deleter.id === verifiedUser.id) || (deleter.role === "admin")){
               
                const userinfo = {
                      id: verifiedUser._id,
                      name:verifiedUser.name,
                      role:verifiedUser.role
                  }
                
                 await User.findByIdAndRemove(userinfo.id)
                    .then(()=>console.log("user deleted"))
                    .catch(err =>console.log("error in deletion of user",err.message));
                
                return true;

              }else{
                // throw new ErrorResponse(`cannot delete a user except yourself or if you're an ADMIN`,ErrorTypes.UNAUTHORISED)
              }
            } catch (error) {
            // throw new ErrorResponse(`unable to delete the user due to DB error: ${error.message}`,error.type);
            }
    default:
        // throw new ErrorResponse(`Please provide what to delete`,ErrorTypes.WRONG_DATA);
    }
    
}
