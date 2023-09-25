import { Page_Type, USER_ROLES, VERIFY_BY } from "../utils/types.js";
import jsonwebtoken from "jsonwebtoken";
import { DB_verifyUser } from "./VerifyUser.js";


export async function Authenticate(req,res,next){
    let token
// auth header looks like: Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]; //we want the token

      // Verify token
      console.log("about to verify")
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await DB_verifyUser(decoded,VERIFY_BY.ID);

      next();
    } catch (error) {
    //   console.log(error)
      res.status(401);
      const response = {
        success: false,
        message: "You are not authenticated",
        error: error.message,
        };
      res.json(response); 
    }
  }

  if (!token) {
    res.status(401);
    const response = {
        success: false,
        message: "You are not authenticated",
        error: "There is no token in the header",
        };
    res.json(response); 
  }
    
}


export function Authorize(role){ 
    
    // you can also create a permissions folder with specific CRUD permissions based on access types and user IDs but in this architecture it will be handled in useCases
    
    return(req,res,next)=>{

        if(
            ((req.user.role === USER_ROLES.ADMIN) || //admin has total access
            (req.user.role === role) //for premium pages
            ) 
            ){
                
                next();
        }
        else{ 
            const response = {
                success: false,
                message: "You have to be authorized to access this path",
                error: "User not authorized",
              }
            res.json(response); 
        }
    }
}