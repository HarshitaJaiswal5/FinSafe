const knex = require('knex');
const db = require('../db/db');
// const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const updateUser = async (req, res) => {

    try {
        const { account_no, full_name, email, password } = req.body;

        // to check if the user entered email id exists
        const result = await db.select('email').from('account_holder_details').where('email', '=', email)
        if (result.length > 0) {

            const Passwords = await db.select('password').from('account_holder_details').where('email', '=', email);
            console.log("Passwords" + password);

            const activePassword = Passwords[0].password;
            console.log("activePassword" + activePassword);

            const isMatching = await argon2.verify( activePassword,password);
            console.log(isMatching);
            if (!isMatching) {
                res.status(400).send("Incorrect Password")
            } else {
                const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
                await db('account_holder_details')
                    .update({
                      
                        full_name: full_name,
                        email: email,
                        password: hashedPassword

                    })
                    .where('account_no', '=', account_no);
                res.status(200).send("details updated successfully!")

            }} else {
                res.status(400).send("invalid email id")
            }


        } catch (error) {
            console.log(error)

        }

    };

    module.exports = {
        updateUser
    };