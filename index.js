const express = require ('express');
const userRoutes = require('./routes/routes');
const userUpdateRoutes = require('./routes/routes');
const branchRoutes = require('./routes/routes');
const userDisplayRoutes = require('./routes/routes')
const branchDisplayRoutes = require('./routes/routes')
const branchUserDisplayRoutes = require('./routes/routes');

const transactionRoutes  = require('./routes/routes');
const notesRoutes  = require('./routes/routes');

const loginRoutes = require('./routes/routes');
const logoutRoutes =require('./routes/routes');


const app = express();
app.use(express.json());

// Routes to register new data
app.use('/api/register',userRoutes);
app.use('/api/register',branchRoutes);
app.use('/api/register', transactionRoutes);
app.use('/api/register', notesRoutes);

// ----- Routes to display data

app.use('/api/display',userDisplayRoutes); 

app.use('/api/display',branchDisplayRoutes);

app.use('/api/display',branchUserDisplayRoutes);

app.use('/api',loginRoutes);

app.use('/api' , logoutRoutes);




// -------------Route to update user details
app.use('/api/update',userUpdateRoutes);





app.listen(3030, ()=>{
    console.log("http://localhost:3030");
});