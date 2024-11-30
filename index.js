const express = require('express');
const register_routes = require('./routes/register');
const display_routes = require('./routes/display');
const update_routes = require('./routes/update');
const auth_routes =  require('./routes/auth');


const app = express()
app.use(express.json())

// all register routes
app.use ('/api/register', register_routes);


// all display routes
app.use ('/api/display', display_routes);


// all update routes
app.use('/api/update', update_routes);


app.use('/api/person', auth_routes);


app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});