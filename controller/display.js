const knex = require('knex');
const db = require('../db/db');
// const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const {generateToken} = require('../utils/generateToken')
const jwt = require('jsonwebtoken');

const displayUser = async (req, res) => {
    try {
        const users = await db.select('*').from('account_holder_details');
        res.status(200).send(users);

    } catch (error) {
        console.log(error);

    }
}

const displayBranch = async (req, res) => {
    try {
        const result = await db.select('*').from('branch_details');
        res.status(200).send(result);

    } catch (error) {
        console.log(error);

    }
};

const branchUsers = async (req, res) => {
    try {
        const { branch_id } = req.body
        const result = await db.select('*').from('account_holder_details').where('branch_id', '=', branch_id);
        res.status(200).send(result);

    } catch (error) {
        console.log(error)

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // to check if the user entered email id exists
        const result = await db.select('email').from('account_holder_details').where('email', '=', email)
        if (result.length > 0) {

            const Passwords = await db.select('password').from('account_holder_details').where('email', '=', email);
           
            const activePassword = Passwords[0].password;
            
            const isMatching = await argon2.verify( activePassword,password,);
            const token = generateToken(req.body);

            // res.json(token);
            // specify the expiry time for the given token
            const details = await db.select('account_no','full_name','branch_id').from('account_holder_details').where('email','=', email);
            const acc_no = (details[0].account_no);
        
            const t_details = await db.select('amount','transaction_id','transaction_type','transaction_description').from('transaction_details').where('account_no','=', acc_no)
            
            const balance = await db.select('balance').from('note_denominations').where('account_no','=', acc_no);
            if (!isMatching) {
                return res.status(500).send("enter correct password");
            } else {
                return res.status(200).json({
                    token,
                    details,
                    t_details,
                    balance

                }
                )
            }
        } else {
            res.status(404).send("User not found!")
        }
    } catch (error) {
        console.log(error)
    }
}


    
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Invalid authorization: Token missing"
            });
        }

        // Verify the token
        jwt.verify(token, 'jan@24', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid authorization: Token invalid"
                });
            }
         
      
           
            return res.status(200).json({
                message: "Logout successful"
            });
        });
    } catch (error) {
        console.log(error);
        
         
        };
    }

module.exports = {
    displayUser,
    displayBranch,
    branchUsers,
    login,
    logout
};