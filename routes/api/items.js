import { Router } from 'express';
const items = Router();


//item model import so that we can edit the database
import Item from '../../models/Item.js';

//@route    GET api/items
//@desc     Get all items
//@access   Public
items.get('/',(req,res)=>{

    Item.find()     //from the Item model we will find all items (find is an function in mongoose)
    .sort({date: -1}) //-1 is descending and 1 is ascending
    .then(items => res.json(items)) //it's a promise so we take the resolve of items and Json-ify it to be parsed by react later.
    .catch(err => console.log(err));
    //test using PostMan
});



//@route    POST api/items
//@desc     Create an item
//@access   Public (private if there is auth)
items.post('/',(req,res)=>{
    // console.log(req.body,' from server');
   //create a variable that you will create in the database
   const newItem = new Item({
       name: req.body.name,       // you can put back ticks because you should enforce a string to match model if you have used the fetch api,In this case we want the name because that is what we defined in our schema. The body parser allows access to req.body
       found:false,
       notAvailable:false,
       amount:req.body.amount?req.body.amount:1
    }); 
    //instance of your model
    // console.log(newItem.name);
     newItem.save()       //saves it in the DB
    .then(item=>res.json(item)) //it's a promise that when resolved will return the item you saved, you now want to pass it to res in order to process with react later
    .catch(err=> console.log(err));
    //test using PostMan
}); 

//@route    DELETE api/items/:id
//@desc     delete an item
//@access   Public (private if there is auth)
items.delete('/:id',(req,res)=>{
    // console.log("delete");
    Item.findByIdAndRemove(req.params.id)
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));

                        /*ANOTHER WAY*/ 
//    Item.findById(req.params.id) //test with FindByIDAndDelete/remove
//    .then(item=>item.remove().then(()=>res.json({success:true}))) // FindbyID returns a promise and remove returns a promise, you can then add a success flag
//     .catch(err =>res.status(404).json({success:false})); //you need catch here in case the ID was not found and then set the status
//      //test using PostMan
 });

 //@route    DELETE api/items/
//@desc     delete all items
//@access   Public (private if there is auth)
items.delete('/',(req,res)=>{
    // console.log(req);
    Item.deleteMany({}) //you can also use remove but it is being deprecated
    .then(()=>res.json({success:true}))
    .catch(err =>res.status(404).json({success:false}));

                        /*ANOTHER WAY*/ 
//    Item.findById(req.params.id) //test with FindByIDAndDelete/remove
//    .then(item=>item.remove().then(()=>res.json({success:true}))) // FindbyID returns a promise and remove returns a promise, you can then add a success flag
//     .catch(err =>res.status(404).json({success:false})); //you need catch here in case the ID was not found and then set the status
//      //test using PostMan
 });

 //@route    PUT api/items
//@desc     update an items status or amount
//@access   Public (private if there is auth)
items.put('/:id',(req,res)=>{
    let oldAmount;
                        /*********************INCREASE*******************/
    if(req.body.action === 'INC'){
        console.log('increase request');
        
        Item.findOne({_id:req.params.id},function(err,item){
            if(err){
                res.status(404).send('item not found'); 
            }else{
                 oldAmount = item.amount;
                 Item.findOneAndUpdate({_id:req.params.id},{amount:oldAmount+1},{upsert:true})
                   .then(()=>res.json({success:true}))
                   .catch(err =>res.json({success:false}));
                 
            }
        })
                            /*********************DECREASE*******************/
    }else if (req.body.action === 'DEC'){
        console.log('decrease request');
        Item.findOne({_id:req.params.id},function(err,item){
            if(err){
                res.status(404).send('item not found'); 
            }else{
                 oldAmount = item.amount;
                 if(oldAmount>1){
                    Item.findOneAndUpdate({_id:req.params.id},{amount:oldAmount-1},{upsert:true})
                       .then(()=>res.json({success:true}))
                       .catch(err =>res.json({success:false}));                     
                 }else{
                     //do nothing
                     res.json({success:true});
                    //  console.log('nothing to do');
                 }
            }
        })    
                            /*********************NOT AVAILABLE*******************/
    }else if (req.body.action === 'NA'){ 
        console.log('Not available request');
        Item.findOneAndUpdate({_id:req.params.id},{notAvailable:!req.body.notAvailable},{upsert:true})
          .then(()=>res.json({success:true}))
          .catch(err =>res.json({success:false}));
    }
                            /*********************STATUS*******************/
    else if (req.body.action === 'DONE'){ 
        console.log('toggle done request');
        Item.findOneAndUpdate({_id:req.params.id},{found:!req.body.found},{upsert:true})
          .then(()=>res.json({success:true}))
          .catch(err =>res.json({success:false}));
    }
    else {
        //do nothing
        res.status(400).json({success:false}); //bad request
    }

  
  
  
     //test using PostMan
 });

export default items;