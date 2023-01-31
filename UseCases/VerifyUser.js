import User from '../models/User.js';


export async function DB_verifyUser(user,verifyby){
   
    let existingUser;

    if(verifyby === "password"){
        
        try{
            await User.findOne({email:user.email},function(err,foundUser){
                if(err){
                    console.log('user not found'); //maybe throw error
                }
                else{
                     existingUser = foundUser;
                }
            })

        }catch(err){
           console.log(`an error occured when finding user by password`,err.message);
        }
        

        if(bcrypt.compareSync(user.password,existingUser.password)){ 
            return existingUser;
        }else{
            console.log(`Password is not the same`); //throw an error
        }
    
    }
    else if(verifyby === "email"){
        try{
            await User.findOne({email:user.email},function(err,foundUser){
                if(err){
                    console.log('user not found'); //maybe throw error
                }
                else{
                     existingUser = foundUser;
                }
            })
            return existingUser;

        }catch(err){
           console.log(`an error occured when finding user by email`,err.message);
        }
    
    }
    else if(verifyby === "id"){
        try{
            await User.findOne({_id:user.id},function(err,foundUser){
                if(err){
                    console.log('user not found'); //maybe throw error
                }
                else{
                     existingUser = foundUser;
                }
            })
            return existingUser;

        }catch(err){
           console.log(`an error occured when finding user by ID`,err.message);
        }
    }
    else if (verifyby === "token"){
        try{
             
            await User.findOne({reset_password_token:user.reset_password_token},function(err,foundUser){
                if(err){
                    console.log('user not found'); //maybe throw error
                }
                else{
                        existingUser = foundUser;
                }
            })

            if(parseInt(existingUser.reset_password_expire_time) > Date.now()){
                return existingUser
            }else{
                return
            }
           

        }catch(err){
            // user does not exist or token expired
            console.log(`user does not exist or token expired`,err.message);

        }

    }else{
        return
    }


}