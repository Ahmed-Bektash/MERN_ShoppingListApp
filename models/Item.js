import { Schema as _Schema, model,SchemaTypes } from 'mongoose';
import { ITEM_TYPES } from '../utils/types.js';
const Schema = _Schema; //capital S

//creating schema basically means what the data should look like when saved.
const ItemSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    notAvailable:{
        type:Boolean,
        required: false
    },
    amount:{
        type:Number,
        required: false
    },
    done:{
        type:Boolean,
        require:false
    },
    type:{
        type:String,
        enum:[ITEM_TYPES.CHECKLIST,ITEM_TYPES.NOTES,ITEM_TYPES.SHOPPING], //add others when necessary
        required:true
    },
    description:{
        type:String,
        required:false,
    },
    list:{
        type: SchemaTypes.ObjectId,
        ref:'list',
        required:false //make true when you add it in the front end
    },
    user:{
        type:SchemaTypes.ObjectId,
        ref: 'User',
        required:true //make true when connecting frontend
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
const Item = model('item',ItemSchema);
export default Item