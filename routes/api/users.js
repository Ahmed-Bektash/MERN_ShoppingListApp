import { Router } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {Authenticate,Authorize} from '../../UseCases/Auth.js';
import { DB_verifyUser } from '../../UseCases/VerifyUser.js';
import Forgot_Password from '../../UseCases/ForgotPassword.js';
import Reset_Password from '../../UseCases/ResetPassword.js';
import Delete from '../../UseCases/DeleteUser.js';
import User from '../../models/User.js';
import { USER_ROLES,Page_Type, VERIFY_BY } from '../../utils/types.js';

const users = Router();

//@route    GET api/users
//@desc     Get all users, should only be called if user is admin
//@access   private
users.get('/',(req,res)=>{ //TODO: Add autherization

    User.find()     //get all users only for admins
    .sort({date: -1}) //-1 is descending and 1 is ascending
    .then(users => res.json(users)) 
    .catch(err => console.log(err));
});



//@route    POST api/users
//@desc     Create a user
//@access   public
users.post('/register',async(req,res)=>{
    
    //check first that they don't exist
    try {
        const user_to_verify= {
            name:req.body.name,
            email:req.body.email,
            role: req.body.role,
            password: req.body.password
          };
            
        const existingUser =  await DB_verifyUser(user_to_verify,VERIFY_BY.EMAIL);
        if(existingUser)
        {
          throw new Error("user already exists in DB!");
        }
        //encrypt password
        const salt = 10;
        const HashedPassword = await bcrypt.hash(req.body.password,salt);
        user_to_verify.password = HashedPassword;
        const userInfo= new User(user_to_verify);
        userInfo = await userInfo.save();
        const response = {
          success: true,
          message: {
            id:userInfo._id,
            name:userInfo.name,
            email:userInfo.email,
            max_lists: userInfo.max_lists,
            max_items_in_list: userInfo.max_items_in_list,
            role: userInfo.role,
            lists: userInfo.Lists,
            token:generateToken(userInfo._id),
          },
          error: null
        }
        res.status(201).json(response);
        
            
    } catch (error) {
        const response = {
          success: false,
          message: "User registration failed",
          error: error.message,
        }
        res.status(400).json(response);
    }

}); 

   
users.post('/login',async(req,res,next)=>{
  try {
    
    const userInfo={
        name:req.body.name,
        email:req.body.email,
        password: req.body.password,
      }
      
      const LoggedInUser =  await DB_verifyUser(userInfo,VERIFY_BY.PASSWORD);

      if(LoggedInUser)
      {
        const response = {
          success: true,
          message: {
            id: LoggedInUser._id,
            name: LoggedInUser.name,
            max_lists: LoggedInUser.max_lists,
            max_items_in_list: LoggedInUser.max_items_in_list,
            role: LoggedInUser.role,
            lists: LoggedInUser.Lists,
            token:generateToken(LoggedInUser._id),
          },
          error: null,
        }
        res.status(201).json(response);
      }
      else
      {
        throw new Error("The user does not exist");
      }


  } catch (error) {
    const response = {
      success: false,
      message: "LogIn Failed: Email or password incorrect",
      error: error.message,
    }
    res.status(400).json(response);
  }
});

users.post('/logout',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res,next)=>{
    try {
   
      if(req.user)
      {
        const response = {
          success: true,
          message: "You have logged out but I hope you come back again...",
          error: null,
        }
        res.status(200).json(response);
      }
      else
      {
        throw new Error("User does not exist. How can you log out when you did not register?")
      }
        
    } catch (error) {
      const response = {
              success: false,
              message: "Failed to log out.",
              error: error.message,
            }
      res.status(400).json(response); 
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
   users.get('/me',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{
      const response = {
        success: true,
        message: {
          id: req.user.id,
          name: req.user.name,
          max_lists: req.user.max_lists,
          max_items_in_list: req.user.max_items_in_list,
          role: req.user.role,
          lists: req.user.Lists,
        },
        error: null,
      }
      res.status(201).json(response);
   });


   //Generating a token:
  const generateToken = (id) =>{
    const token = jsonwebtoken.sign({id},process.env.JWT_SECRET,{
      expiresIn:'1w',
    });
    return token;
  }
export default users;