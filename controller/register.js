const knex = require('knex');
const db = require('../db/db');
// const bcrypt = require('bcryptjs');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validateFields_branch, validateFields_user, validateFields_trans, validateFields_notes } = require('../utils/validateFields');

const registerUser = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        const areValidFields = await validateFields_user(req.body);
        console.log(areValidFields);
        if (!areValidFields) {
            res.status(400).send("Only valid fields to add: 'full_name' , 'email' and 'password'")
        } else {
            const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
            await db('account_holder_details').insert({
                full_name,
                email,
                password: hashedPassword,
            });
            res.status(201).send("User registered successfully!");
        }

    } catch (error) {
        console.log(error);
    }
};
const branch = async (req, res) => {
    try {
        const { branch_id, branch_name, address } = req.body;
        const result = await validateFields_branch(req.body);
        console.log('result' + result);
        if (!result) {
            res.status(400).send("Only valid fields to add: 'branch_id' , 'branch_name' and 'address' ")
        } else {
            await db('branch_details').insert({
                branch_id,
                branch_name,
                address
            });
            res.status(201).send("Branch registered successfully!");

        }
    }


    catch (error) {
        console.log(error);
    }
}
    ;
const transaction = async (req, res) => {
    try {
        const { account_no, transaction_id, amount, transaction_type, transaction_description } = req.body;
        const result = await validateFields_trans(req.body);

        if (!result) {
            return res.status(400).send("Only valid fields to add: 'account_no', 'transaction_id', 'amount', 'transaction_type', 'transaction_description'")
        } else {
            await db('transaction_details').insert({
                account_no,
                transaction_id,
                amount,
                transaction_type,
                transaction_description,
            });


        }
        const balance = await db.select('balance').from('note_denominations').where('account_no', '=', account_no);
        const actBalance = (balance[0].balance);


        const t_id = await db.select('transaction_id').from('transaction_details').where('account_no', '=', account_no);
        console.log(t_id)
        console.log(t_id.length)

        if (t_id.length <= 1) {
            await db('current_balance_details').insert({
                account_no
            })
            if (transaction_type == 'debit') {

                const result = actBalance - amount;
                console.log(result);
                const final = await db('current_balance_details')
                    .update({
                        current_balance: result,
                    })
                    .where('account_no', '=', account_no)
            } else if (transaction_type == 'credit') {

                const result = actBalance + amount;
                console.log(result);



                const final = await db('current_balance_details')
                    .update({
                        current_balance: result,
                    })
                    .where('account_no', '=', account_no);
            }
        } else {
            const cur_balance = await db.select('current_balance').from('current_balance_details').where('account_no', '=', account_no);
            const act_cur_balance = (cur_balance[0].current_balance);
            console.log(`act_cur_balance`);
            if (transaction_type == 'debit') {
                const result = act_cur_balance - amount;
                console.log(result);
                await db('current_balance_details')
                    .update({
                        current_balance: result,
                    })
                    .where('account_no', '=', account_no)
            } else if (transaction_type == 'credit') {

                const result = act_cur_balance + amount;
                console.log(result);
                await db('current_balance_details')

                    .update({
                        current_balance: result,
                    })
                    .where('account_no', '=', account_no)


            }

        }
        res.status(201).send("Transaction registered successfully!");
    } catch (error) {
        console.log(error);
    }
};
const denoms = async (req, res) => {
    try {
        const { account_no, notes_1000rs, notes_2000rs } = req.body;
        const result = await validateFields_notes(req.body);
        console.log(result);
        if (!result) {
            return res.status(400).send("Only valid fields to add: 'account_no', 'notes_1000rs', 'notes_2000rs' ")

        } else {
            const balance = ((1000 * notes_1000rs) + (2000 * notes_2000rs));

            await db('note_denominations').insert({
                account_no,
                notes_1000rs,
                notes_2000rs,
                balance
            });
            res.status(201).send("Denominations registered successfully!");
        }
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