import User from '../models/User.js';
import bcrypt from 'bcrypt'
import { VERIFY_BY } from '../utils/types.js';


/**
 * 
 * @param {1} user from request
 * @param {2} verifyby option to check DB for
 * @returns either undefined/null or a user object or throws an error
 */
export async function DB_verifyUser(user,verifyby){
   
    let existingUser;
        
    try{
        switch (verifyby) {
            case VERIFY_BY.EMAIL:
                existingUser = await User.findOne({email:user.email});                
                break;
            case VERIFY_BY.PASSWORD:
                existingUser = await User.findOne({email:user.email});
                if(!existingUser)
                {
                    throw new Error("User does not exist");
                }
                
                const correctPassword = await bcrypt.compare(user.password,existingUser.password);
                if(!correctPassword )
                { 
                    throw new Error("password verification failed");   
                }
    
                break;

            case VERIFY_BY.ID:
                existingUser = await User.findOne({_id:user.id});
                break;

            case VERIFY_BY.TOKEN:
                existingUser = await User.findOne({reset_password_token:user.reset_password_token})
                if(parseInt(existingUser.reset_password_expire_time) <= Date.now()){
                    throw new Error("Token expired please renew");   
                }
                break;
            
            default:
                throw new Error("Verification option is not valid");   
        }

        return existingUser;
        

        
    }catch(err){
        existingUser = null;
        throw new Error(err.message);
    }
        


}