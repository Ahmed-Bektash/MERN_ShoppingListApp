import { Page_Type, USER_ROLES } from "../utils/types.js";



export function Authenticate(req,res,next){


    if(!req.session || !req.session.user_ID || !req.session.user_Type){
        // next(new ErrorResponse("user not authenticated",ErrorTypes.NOT_AUTHENTICATED));
    }else{ 
        next();
    }
}


export function Authorize(role, Access){ 
    
    // you can also create a permissions folder with specific CRUD permissions based on access types and user IDs but in this architecture it will be handled in useCases
    
    return(req,res,next)=>{

        if(
            ((req.session.user_Type === USER_ROLES.ADMIN) || //admin has total access
            (req.session.user_Type === role) || //for premium pages
            ((Access === Page_Type.PRIVATE) && (req.session.user_ID=== req.body.id))) //for private pages

            ){
                
                next();
        }
        else{ 
            // next(new ErrorResponse("user not Authorized to access resource",ErrorTypes.UNAUTHORISED));
        }
    }
}