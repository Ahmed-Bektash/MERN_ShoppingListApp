import { Router } from 'express';
import {Authenticate,Authorize} from '../../UseCases/Auth.js';
import { DB_verifyUser } from '../../UseCases/VerifyUser.js';
import Forgot_Password from '../../UseCases/ForgotPassword.js';
import Reset_Password from '../../UseCases/ResetPassword.js';
import Delete from '../../UseCases/DeleteUser.js';
import User from '../../models/User.js';
import { USER_ROLES,Page_Type } from '../../utils/types.js';

const users = Router();

//@route    GET api/users
//@desc     Get all users, should only be iing user is admin
//@access   private
users.get('/',(req,res)=>{

    User.find()     //get all users only from admins
    .sort({date: -1}) //-1 is descending and 1 is ascending
    .then(users => res.json(users)) 
    .catch(err => console.log(err));
});



//@route    POST api/users
//@desc     Create a user
//@access   private
users.post('/register',async(req,res)=>{
    
    //check first that they don't exist
    try {
        const user_to_verify= {
            username:req.body.name,
            email:req.body.email,
            paid: req.body.role,
            password: req.body.password
          };
        await DB_verifyUser(user_to_verify,"email");
    } catch (error) {
        //error happened in verification
    }

    //encrypt password
    const salt = 10;
    const HashedPasswords = await bcrypt.hashSync(req.body.password, salt);
    const userInfo= new User({
        username:req.body.name,
        email:req.body.email,
        paid: req.body.role,
        password: HashedPasswords
      });

      //save user and session
    userInfo.save()       
    .then((user)=>{
        res.json(user)
        // response.session={
        //     uid:AddedUser!.id,
        //     role: AddedUser!.type
        // }
    }) 
    .catch(err=> console.log(err));
    

}); 

   
   users.post('/login',async(req,res,next)=>{
     try {
       
        const userInfo={
            username:req.body.username,
            email:req.body.email,
            paid: req.body.isPaidAccount,
            password: req.body.password,
            type: req.body.type
          }
          const LoggedInUser =  await DB_verifyUser(userInfo,"password");
          res.body = LoggedInUser;
        //   res.session={
        //         uid:LoggedInUser.id,
        //         role: LoggedInUser.type
        //     }

   } catch (error) {
    //  next(new ErrorResponse(error.message,error.type));
   }
   });
   
   users.post('/logout',Authenticate,async(req,res,next)=>{
    try {
        const userInfo={
            id:req.body.id
          }
        const verifiedUser =  await DB_verifyUser(userInfo,"ID");
        let isLoggedOut=  verifiedUser?true:false;
         
        //   res.session={
        //       loggedout:isLoggedOut
        //   }

        res.body={
            success:true,
            message: 'you have logged out'
        }
          
        return res;   
   } catch (error) {
    //  next(new ErrorResponse(error.message,error.type));
   }
   });
   
   users.post('/forgotpassword',Authenticate,async(req,res,next)=>{
    try {
        const userInfo={
            email:req.body.email,
            type: req.body.type,
            updateDate: new Date()
          } 

          let ForgetPasswordResponse=  await Forgot_Password(userInfo);
            res.body=ForgetPasswordResponse
            
            return res;

   } catch (error) {
    //  next(new ErrorResponse(error.message,error.type));
   }
   });
   
   users.put('/passwordreset/:resetToken',Authenticate,async(req,res,next)=>{
     try {
       const userInfo={
        email:req.body.email,
        password:req.body.password,
        resetPasswordToken:req.params.resetToken,
      }

      let passwordResetResponse=  await Reset_Password(userInfo);
      res.body=passwordResetResponse
      
      return response;      

   } catch (error) {
    //  next(new ErrorResponse(error.message,error.type));
   }
   }); 
   
   users.delete('/',Authenticate,Authorize(USER_ROLES.UNDEFINED,Page_Type.PRIVATE),async(req,res,next)=>{
   
    const toBeDeleted={
      id:req.body.id 
    } //not params for secuirty not to have the ID displayed on the URL

   const RequestingUser = { 
       id: req.session.uid,
       role:req.session.role
   }
       
    try {
        //by now the user should be already authenticated
        await Delete(toBeDeleted,RequestingUser,"user");
        response.body={
            success:true,
            message: `user with id: ${toBeDeleted.id} has been deleted`
        }
        
        return response;         
        
    } catch (error) {
        // throw new ErrorResponse(`Can't delete user due to: ${error.message}`,error.type);
    }
   
   });
   

   
   
   
   //test diffferent roles
   
   users.get('/dashboard',Authenticate,Authorize(USER_ROLES.UNDEFINED,Page_Type.PRIVATE),async(req,res)=>{
     // console.log(req.headers) 
     console.log('session:',req.session)
     res.send('Dashboard!')
   });

export default users;