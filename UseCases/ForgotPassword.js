import { DB_verifyUser } from "./VerifyUser.js";
import sendEmail from "./sendEmail.js";
import crypto from "crypto";
import User from "../models/User.js";
import { VERIFY_BY } from "../utils/types.js";

export default async function Forgot_Password(userinfo){
    
    try {

        const verifiedUser =  await DB_verifyUser(userinfo,VERIFY_BY.EMAIL);
    
        if(!verifiedUser){
            throw new Error(`DB error: User not found`);
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

        const userInfo = {
            reset_password_token:resetToken,
            reset_password_expire_time:tokenValidTime
        }

        await UpdateUser(verifiedUser._id,userInfo);
    
        try {
        const returnFromEmail= sendEmail({
            EmailTo: verifiedUser.email,
            subject: "Password Reset Request from the Lists app",
            text: message,
        });

        const returnObject = {
            success:true,
            message: `email sent to ${verifiedUser.email}`,
            body:returnFromEmail
        }
        return returnObject;


        } catch (err) { //separate catch because we want to keep the verified user here

            resetToken = undefined;
            tokenValidTime = undefined;
            const userInfo = {
                reset_password_token:resetToken,
                reset_password_expire_time:tokenValidTime
            }
            await UpdateUser(verifiedUser._id,userInfo);

        }

    } catch (error) {

        throw new Error(error.message);
    } 
}



function GenerateToken(){
    const resetToken= crypto.randomBytes(20).toString("hex");
    return crypto.createHash("sha256").update(resetToken).digest("hex");
  }


export async function UpdateUser(id,user){
    try {
        const updated = await User.findOneAndUpdate(
            {_id:id,},
            user,
            {upsert:true});
    
        if(!updated)
        {
            throw new Error("This user could not be updated!");
        }
            
        } catch (error) {
            throw new Error(error.message);
        }
  }