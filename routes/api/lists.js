import { Router } from 'express';
const lists = Router();


//lists model import so that we can edit the database
import List from '../../models/List.js';
import {Authenticate,Authorize} from '../../UseCases/Auth.js';
import { USER_ROLES } from '../../utils/types.js';

//@route    GET api/lists
//@desc     Get all lists
//@access   Private
lists.get('/',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{

    try {
        
        const lists = await List.find({user:req.user.id}).sort({date: -1}) //-1 is descending and 1 is ascending
        if(lists) //TODO: maybe we need to check that if list is empty it is not undefined
        {
            const response = {
                success: true,
                message: lists,
                error: null,
            }
            res.status(200).json(response);
        }
        else{
            throw new Error(`Lists are undefined or empty: ${lists}`)
        }
    } catch (error) {
        const response = {
            success: false,
            message: `There are no lists for this user: ${req.user.name}`,
            error: error.message,
        }
        res.status(404).json(response);
        
    }
});


//@route    POST api/lists
//@desc     Create a list
//@access   Private
lists.post('/',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{
    // console.log(req.body,' from server');
   try {
    
        const newList = new List({
            name: req.body.name, 
            type:req.body.type,
            category:req.body.category,
            user:req.user.id
            }); 
        //instance of your model
        // console.log(newList.name);
        const list = await newList.save();     //saves it in the DB
        if(list)
        {
            const response = {
                success: true,
                message: list,
                error: null,
            }
            res.status(200).json(response);
        }
        else{
            throw new Error(`The list could not be saved`)
        }
    } catch (error) {
        const response = {
            success: false,
            message: `failed to save list for: ${req.user.name}`,
            error: error.message,
        }
        res.status(500).json(response);
    }
}); 

//@route    DELETE api/lists/:id
//@desc     delete a list
//@access   private
lists.delete('/:id',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{
    // console.log("delete list with id:",req.params.id);
    try {
        const list_to_del = await List.findById(req.params.id);
        
        if(!list_to_del)
        {
            throw new Error("This list does not exist to be deleted...");
        }

        if((req.user.id != list_to_del.user.toString()) || (req.user.role != USER_ROLES.ADMIN))
        {
            throw new Error("This user cannot delete this list because they are neither admin nor the owner of the list");
        }
        await List.findByIdAndRemove(req.params.id);
        const response = {
            success: true,
            message: `List with id: ${req.params.id} has been removed`,
            error: null,
        }
        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: `List with id: ${req.params.id} Could not be removed`,
            error: error.message,
        }
        res.status(500).json(response);
        
    }

 });

 //@route    DELETE api/lists/
//@desc     delete all lists
//@access   private
lists.delete('/',Authenticate,Authorize(USER_ROLES.NORMAL),(req,res)=>{
    // console.log(req);
    List.deleteMany({user:req.user.id})
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));
 });

 //@route    PUT api/lists
//@desc     update a list status
//@access   private
lists.put('/:id',Authenticate,Authorize(USER_ROLES.NORMAL),(req,res)=>{
  
  //set state to latest
  
     //test using PostMan
 });

export default lists;