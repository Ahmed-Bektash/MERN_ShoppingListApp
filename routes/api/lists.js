import { Router } from 'express';
const lists = Router();


//lists model import so that we can edit the database
import List from '../../models/List.js';

//@route    GET api/lists
//@desc     Get all lists
//@access   Private
lists.get('/',(req,res)=>{

    List.find()     //from the Item model we will find all lists (find is an function in mongoose)
    .sort({date: -1}) //-1 is descending and 1 is ascending
    .then(lists => res.json(lists)) //it's a promise so we take the resolve of lists and Json-ify it to be parsed by react later.
    .catch(err => console.log(err));
    //test using PostMan
});


//@route    POST api/lists
//@desc     Create a list
//@access   Private
lists.post('/',(req,res)=>{
    // console.log(req.body,' from server');
   //create a variable that you will create in the database
   const newList = new List({
       name: req.body.name, 
       type:req.body.type,
       category:req.body.category,
        //@TODO: add the rest
    }); 
    //instance of your model
    // console.log(newList.name);
     newList.save()       //saves it in the DB
    .then(item=>res.json(item)) //it's a promise that when resolved will return the item you saved, you now want to pass it to res in order to process with react later
    .catch(err=> console.log(err));
    //test using PostMan
}); 

//@route    DELETE api/lists/:id
//@desc     delete a list
//@access   private
lists.delete('/:id',(req,res)=>{
    console.log("delete list with id:",req.params.id);
    List.findByIdAndRemove(req.params.id)
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));

                        /*ANOTHER WAY*/ 
//    Item.findById(req.params.id) //test with FindByIDAndDelete/remove
//    .then(item=>item.remove().then(()=>res.json({success:true}))) // FindbyID returns a promise and remove returns a promise, you can then add a success flag
//     .catch(err =>res.status(404).json({success:false})); //you need catch here in case the ID was not found and then set the status
//      //test using PostMan
 });

 //@route    DELETE api/lists/
//@desc     delete all lists
//@access   private
lists.delete('/',(req,res)=>{
    // console.log(req);
    List.deleteMany({}) //you can also use remove but it is being deprecated
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));

                        /*ANOTHER WAY*/ 
//    Item.findById(req.params.id) //test with FindByIDAndDelete/remove
//    .then(item=>item.remove().then(()=>res.json({success:true}))) // FindbyID returns a promise and remove returns a promise, you can then add a success flag
//     .catch(err =>res.status(404).json({success:false})); //you need catch here in case the ID was not found and then set the status
//      //test using PostMan
 });

 //@route    PUT api/lists
//@desc     update a list status
//@access   private
lists.put('/:id',(req,res)=>{
  
  //set state to latest
  
     //test using PostMan
 });

export default lists;