const knex = require('knex');
const db = require('../db/db');
// const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        const hashedPassword = await argon2.hash(password,{type: argon2.argon2id});
        await db('account_holder_details').insert({
            full_name,
            email,
            password: hashedPassword,
        });
        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.log(error);
    }
};
const branch = async (req, res) => {
    try {
        const { branch_id, branch_name, address } = req.body;

        await db('branch_details').insert({
            branch_id,
            branch_name,
            address
        });
        res.status(201).send("Branch registered successfully!");
    } catch (error) {
        console.log(error);
    }
};
const transaction = async (req, res) => {
    try {
        const { account_no, transaction_id, amount, transaction_type, transaction_description } = req.body;

        const results = await db('transaction_details').insert({
            account_no,
            transaction_id,
            amount,
            transaction_type,
            transaction_description,
        });


        // const balance = await db.select('balance').from('note_denominations').where('account_no', '=', account_no);
        // const actBalance = (balance[0].balance);

        // if (transaction_type == 'debit') {

        //     const result = actBalance - amount;
        //      db('note_denominations')
        //         .update({
        //             balance:result,
        //         })
        //         .where('account_no', '=', account_no);


        //     // console.log(result[0]);
        // } else {

        //     const result = db('note_denominations')
        //         .where('account_no', '=', account_no)
        //         .decrement('balance', amount)

        // }
        res.status(201).send("Transaction registered successfully!");
    } catch (error) {
        console.log(error);
    }
};
const denoms = async (req, res) => {
    try {
        const { account_no, notes_1000rs, notes_2000rs } = req.body;
        const balance = ((1000 * notes_1000rs) + (2000 * notes_2000rs));

        await db('note_denominations').insert({
            account_no,
            notes_1000rs,
            notes_2000rs,
            balance
        });
        res.status(201).send("Denominations registered successfully!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registerUser,
    branch,
    transaction,
    denoms
};