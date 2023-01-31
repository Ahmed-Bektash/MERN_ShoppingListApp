import { DB_verifyUser } from "./VerifyUser.js";
import { UpdateUser } from "./ForgotPassword.js";
import bcrypt from 'bcrypt';

export default async function Reset_Password(userinfo){

try {
    const  userObject={
        resetPasswordToken: userinfo.resetPasswordToken,
        email: userinfo.email
       }

       const verifiedUser =  await DB_verifyUser(userObject,"token");
    
     if(!verifiedUser){
        // throw new ErrorResponse(`DB error: User not found`,ErrorTypes.RESOURCE_NOT_FOUND);
     }

     const salt=10;
     const HashedPasswords = await bcrypt.hashSync(user.getPassword(), salt);

     const ObjToBeUpdated={
        password: HashedPasswords,
        reset_password_token:undefined,
        reset_password_expire_time:undefined
       }

       await UpdateUser(verifiedUser.id,ObjToBeUpdated);

       const returnObject = { 
        success:true,
        message: `updated password for ${userinfo.email}`
    }

    return returnObject;
    
} catch (error) {
    // throw new ErrorResponse(`unable to reset Password due to: ${error.message}`,ErrorTypes.INTERNAL_SERVER_ERROR);
}

}