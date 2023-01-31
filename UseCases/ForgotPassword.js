import { DB_verifyUser } from "./VerifyUser.js";
import sendEmail from "./sendEmail.js";
import crypto from "crypto";
import User from "../models/User.js";

export default async function Forgot_Password(userinfo){
    
    try {

    const  userObject={
       email: userinfo.email,
      }
        
      const verifiedUser =  await DB_verifyUser(userObject,"email");
    
     if(!verifiedUser){
        // throw new ErrorResponse(`DB error: User not found`,ErrorTypes.RESOURCE_NOT_FOUND);
     }

     let resetToken = GenerateToken(); 
     let tokenValidTime = Date.now() + 10 * (60 * 1000); // Ten Minutes
     const resetUrl = `${process.env.RESET_URL}/${resetToken}`; //update when deploying properly
     // HTML Message
    const message = `
                        <h1>You have requested a password reset</h1>
                        <p>Please click on the following link:</p>
                        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                    `;


     const ObjToBeUpdated= {
      reset_password_token:resetToken,
      reset_password_expire_time:tokenValidTime
     }

     
    await DB_UpdateUser(verifiedUser.id,ObjToBeUpdated);

    try {
      const returnFromEmail= sendEmail({
        EmailTo: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      const returnObject = {
          success:true,
          message: `email sent to ${user.email}`,
          body:returnFromEmail
      }
      return returnObject;


    } catch (err) { //separate catch because we want to keep the verified user here

        resetToken = undefined;
        tokenValidTime = undefined;

      const ObjToBeUpdated= {
        reset_password_token:resetToken,
        reset_password_expire_time:tokenValidTime
     }

    await UpdateUser(verifiedUser.id,ObjToBeUpdated);

    // throw new ErrorResponse(`Email could not be sent because ${err.message}`,err.type);
    }

    } catch (error) {
    
    //   throw new ErrorResponse(`unable to forget Password: ${error.message}`,error.type);
  

    } 
}



function GenerateToken(){
    const resetToken= crypto.randomBytes(20).toString("hex");
    return crypto.createHash("sha256").update(resetToken).digest("hex");
  }


export async function UpdateUser(id,user){
    if(!id){
        // throw new ErrorResponse(`ID must be provided`,ErrorTypes.WRONG_DATA);
    }
 
        try {

            User.findOneAndUpdate({_id:id},{
                reset_password_token:user.resetToken,
                reset_password_expire_time:user.tokenValidTime
            },{upsert:true})
            .then(()=>res.json({success:true}))
            .catch(err =>res.json({success:false}));
             
            const returnObj={
                success: true,
                message: 'updated the user data!'
            }
 
            return returnObj;
            
        } catch (error) {
            // throw new ErrorResponse(error.message,ErrorTypes.DB_ERROR);
        }
  }