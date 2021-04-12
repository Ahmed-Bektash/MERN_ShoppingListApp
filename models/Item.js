const mongoose = require('mongoose');
const Schema = mongoose.Schema; //capital S

//creating schema basically means what the data should look like when saved.
const ItemSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    date:{
        type: Date, //capital D
        default: Date.now //current date of creation
    }
    
});

//exporting the model and schema
module.exports = Item = mongoose.model('item',ItemSchema);