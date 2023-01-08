const express = require('express');
const mongooese = require('mongoose');
const path = require('path');
require('dotenv').config();

//requiring the routes: it's kept in a separate folder to be clean.
const items = require('./routes/api/items');

//initialize the app
const app = express();

//body parser middleware
app.use(express.json());

//configure DB
/*
1- create a config folder 
2- create a keys.js file
3- create a mongodb account
4- create a project
5- create a cluster 
6- create a database which will force you to create a collection which will force you to create a user.
7- copy the db connection string URI from the connect modal that will open
8- replace password with user password that you created for the DB
9- here you can connect the keys file (which exports the URI)
10-connect to mongo using the mongoose with your URI
*/
// const db = require('./config/keys').mongoURI;
const db = process.env.MONGO_URI;

mongooese.connect(db ,{
    useNewUrlParser: true, 
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false 
}).then(()=>console.log('Mongo db connected')) 
.catch(err=> console.log('Mongo cannot connect'));

    //middleware for all apis to make sure all routes with this url will go to a routing handler.
app.use('/api/items',items);

//serve the static assets here if we are in production (there is a post build script that will serve them)
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

//set up ports and server init
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started on port ${port}`)); 


//publish on https://dashboard.render.com/
