import { Schema as _Schema, model } from 'mongoose';
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
    found:{
        type:Boolean,
        require:false
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
const Item = model('item',ItemSchema);
export default Item