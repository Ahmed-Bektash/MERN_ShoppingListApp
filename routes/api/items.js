const express = require('express');
const router = express.Router();


//item model import so that we can edit the database
const Item = require('../../models/Item');

//@route    GET api/items
//@desc     Get all items
//@access   Public
router.get('/',(req,res)=>{

    Item.find()     //from the Item model we will find all items (find is an function in mongoose)
    .sort({date: -1}) //-1 is descending and 1 is ascending
    .then(items => res.json(items)) //it's a promise so we take the resolve of items and Json-ify it to be parsed by react later.
    .catch(err => console.log(err));
    //test using PostMan
});



//@route    POST api/items
//@desc     Create an item
//@access   Public (private if there is auth)
router.post('/',(req,res)=>{

   //create a variable that you will create in the database
   const newItem = new Item({
       name:req.body.name       //In this case we want the name because that is what we defined in our schema. The body parser allows access to req.body
   }); //instance of your model

   newItem.save()       //saves it in the DB
    .then(item=>res.json(item)) //it's a promise that when resolved will return the item you saved, you now want to pass it to res in order to process with react later
    .catch(err=> console.log(err));
    //test using PostMan
});

//@route    DELETE api/items/:id
//@desc     delete an item
//@access   Public (private if there is auth)
router.delete('/:id',(req,res)=>{

    Item.findByIdAndRemove(req.params.id)
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));

                        /*ANOTHER WAY*/ 
//    Item.findById(req.params.id) //test with FindByIDAndDelete/remove
//    .then(item=>item.remove().then(()=>res.json({success:true}))) // FindbyID returns a promise and remove returns a promise, you can then add a success flag
//     .catch(err =>res.status(404).json({success:false})); //you need catch here in case the ID was not found and then set the status
//      //test using PostMan
 });

 //@route    PUT api/items
//@desc     update an item
//@access   Public (private if there is auth)
router.put('/:id',(req,res)=>{

    newItemName = req.body.name;
  Item.findByIdAndUpdate(req.params.id,{name:newItemName})
  .then(()=>res.json({success:true, newItem:newItemName}))
  .catch(err =>res.json({success:false}));
  
  
     //test using PostMan
 });

module.exports = router;