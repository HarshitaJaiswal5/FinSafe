const knex = require('knex');
const db = require('../db/db');
// const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const updateUser = async (req,res) => {

    try {
        const {account_no, branch_id, full_name, email,password} = req.body;
        const hashedPassword = await argon2.hash(password,{type: argon2.argon2id});
        await db('account_holder_details')       
        .update({
            branch_id: branch_id,
            full_name: full_name,
            email: email,
            password:hashedPassword
            
        })
        .where('account_no','=', account_no );
        res.status(200).send("details updated successfully!")
       
    } catch (error) {
        console.log(error)
        
    }
   
};

module.exports = {
    updateUser
};