const express = require('express');
const register_routes = require('./routes/register');
const display_routes = require('./routes/display');
const update_routes = require('./routes/update');
const auth_routes =  require('./routes/auth');

require('dotenv').config();

const app = express()
app.use(express.json())

app.use ('/api/register', register_routes);

app.use ('/api/display', display_routes);

app.use('/api/update', update_routes);

app.use('/api/person', auth_routes);

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server is running on port 3000");
});