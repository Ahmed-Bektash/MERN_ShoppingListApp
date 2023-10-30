import { Router } from 'express';
const items = Router();


//item model import so that we can edit the database
import Item from '../../models/Item.js';
import {Authenticate,Authorize} from '../../UseCases/Auth.js';
import { USER_ROLES } from '../../utils/types.js';
import mongoose from 'mongoose';

//@route    GET api/items
//@desc     Get all items
//@access   private
items.get('/:listId',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{
    try {
        const items = await Item.find({
             list: req.params.listId,
             user: req.user.id //maybe needs to be _id
             }).sort({date: -1}) //-1 is descending and 1 is ascending
        
             if(items) //TODO: maybe we need to check that if list is empty it is not undefined
             {
                 const response = {
                     success: true,
                     message: items,
                     error: null,
                 }
                 res.status(200).json(response);
             }
             else{
                 throw new Error(`items are undefined or empty: ${items}`)
             }
        } catch (error) {
            const response = {
                success: false,
                message: `There are no items for this user: ${req.user.name} for this list: ${ req.params.listId}`,
                error: error.message,
            }
            res.status(404).json(response);
            
        }
});



//@route    POST api/items
//@desc     Create an item
//@access   Private
items.post('/', Authenticate, Authorize(USER_ROLES.NORMAL), async(req,res)=>{
    //create a variable that you will create in the database
    try
    {

        const newItem = new Item({
            name: req.body.name,
            found:false,
            notAvailable:false,
            amount:req.body.amount?req.body.amount:1,
            list:req.body.list,
            user:req.user.id
        }); 
        
        const item = await newItem.save()       //saves it in the DB
        if(item)
        {
            const response = {
                success: true,
                message: item,
                error: null,
            }
            res.status(200).json(response);
        }
        else{
            throw new Error(`The item could not be saved`)
        }
    } catch (error) {
        const response = {
            success: false,
            message: `failed to save item for: ${req.user.name}`,
            error: error.message,
        }
        res.status(500).json(response);
    }
}); 

//@route    DELETE api/items/:id
//@desc     delete an item
//@access   Public (private if there is auth)
items.delete('/:id',Authenticate,Authorize(USER_ROLES.NORMAL),async(req,res)=>{
    // console.log("delete");
    try {
        const item_to_del = await Item.findById(req.params.id);
        
        if(!item_to_del)
        {
            throw new Error("This item does not exist to be deleted...");
        }

        if((req.user.id != item_to_del.user.toString()) || (req.user.role != USER_ROLES.ADMIN))
        {
            throw new Error("This user cannot delete this item because they are neither admin nor the owner of the item");
        }
        await Item.findByIdAndRemove(req.params.id);
        const response = {
            success: true,
            message: `Item with id: ${req.params.id} has been removed`,
            error: null,
        }
        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: `Item with id: ${req.params.id} Could not be removed`,
            error: error.message,
        }
        res.status(500).json(response);
        
    }
 });

 //@route    DELETE api/items/
//@desc     delete all items
//@access   Private
items.delete('/list/:id',Authenticate,Authorize(USER_ROLES.NORMAL),(req,res)=>{
    Item.deleteMany({
        list:req.params.id,
        user:req.user.id
    }) //you can also use remove but it is being deprecated
    .then(()=>res.json({success:true}))
    .catch(err =>{res.status(404).json({success:false})});

 });

 //@route    PUT api/items
//@desc     update an items status or amount
//@access   Public (private if there is auth)
items.put('/:id',Authenticate,Authorize(USER_ROLES.NORMAL), async(req,res)=>{
    let oldAmount;
    try {
        
        const item_to_update = await Item.findOne({_id:req.params.id,});
            
        if(!item_to_update)
        {
            throw new Error("This item does not exist to be updated...");
        }

        if((req.user.id != item_to_update.user.toString()) || (req.user.role != USER_ROLES.ADMIN))
        {
            throw new Error("This user cannot update this item because they are neither admin nor the owner of the item");
        }
                            /*********************INCREASE*******************/
        if(req.body.action === 'INCREASE'){
            console.log('increase request');
            
            oldAmount = item_to_update.amount;
           await  Item.findOneAndUpdate({_id:req.params.id},{amount:oldAmount+1},{upsert:true});
            
                                /*********************DECREASE*******************/
        }else if (req.body.action === 'DECREASE'){
            console.log('decrease request');
            oldAmount = item_to_update.amount;
            if(oldAmount>1){
                Item.findOneAndUpdate({_id:req.params.id},{amount:oldAmount-1},{upsert:true});                     
            }
              
                                /*********************NOT AVAILABLE*******************/
        }else if (req.body.action === 'NOT_FOUND'){ 
            console.log('Not available request');
            Item.findOneAndUpdate({_id:req.params.id,},{notAvailable:!req.body.notAvailable},{upsert:true});
        }
                                /*********************STATUS*******************/
        else if (req.body.action === 'FOUND'){ 
            console.log('toggle done request');
            Item.findOneAndUpdate({_id:req.params.id,},{found:!req.body.found},{upsert:true});
        }
        else {
            //do nothing
            throw new Error("The request action is invalid");
        }

        const response = {
            success: true,
            message: `Item updated for request ${req.body.action}!`,
            error: null,
        }
        res.status(200).json(response);

    } catch (error) {
        const response = {
            success: false,
            message: `Item with id: ${req.params.id} Could not be updated`,
            error: error.message,
        }
        res.status(500).json(response);
    }

 });


//@route    POST api/items
//@desc     Create many
//@access   Private
items.post('/copy', Authenticate, Authorize(USER_ROLES.NORMAL), async(req,res)=>{
    try
    {
        if(!(req.body.items) || !(req.body.destination))
        {

            throw new Error(`There is no list to copy`);
        }
        
        const items = await Item.find({list: req.body.destination,}).sort({date: -1}) //-1 is descending and 1 is ascending

        const item_names = items.map(item=> item.name);

        req.body.items.forEach(async(cpy_item) => {
        
        if(!item_names.find(name => name === cpy_item.name))
        {
            const newItem = new Item({
                name: cpy_item.name,
                found:false,
                notAvailable:false,
                amount:cpy_item.amount,
                list:req.body.destination,
                user:req.user.id
            }); 

            const item = await newItem.save();
            if(!item)
            {
                throw new Error(`The item ${cpy_item.name} could not be saved`);
            }
        }

        });
        
        
        const response = {
            success: true,
            message: req.body.items,
            error: null,
        }
        res.status(200).json(response);
        
    } catch (error) {
        
        const response = {
            success: false,
            message: `failed to copy list for: ${req.user.name}`,
            error: error.message,
        }
        res.status(500).json(response);
    }
}); 
export default items;