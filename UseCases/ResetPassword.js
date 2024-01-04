import { DB_verifyUser } from "./VerifyUser.js";
import { UpdateUser } from "./ForgotPassword.js";
import bcrypt from 'bcrypt';

export default async function Reset_Password(userinfo){

try {

     const salt=10;
     const HashedPasswords =  await bcrypt.hash(userinfo.password,salt);

     const ObjToBeUpdated={
        password: HashedPasswords,
        reset_password_token:undefined,
        reset_password_expire_time:undefined
       }

       await UpdateUser(userinfo.id,ObjToBeUpdated);

       const returnObject = { 
        success:true,
        message: `updated password successfully`
        }

    return returnObject;
    
} catch (error) {
    throw new Error(`unable to reset Password due to: ${error.message}`);
}

}