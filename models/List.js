import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema; //capital S

import ItemSchema from './Item.js'

//creating schema basically means what the data should look like when saved.
const ListSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    items:{
        type:[ItemSchema],
        require:true
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
module.exports = List = mongoose.model('list',ListSchema);