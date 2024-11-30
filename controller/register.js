const knex = require('knex');
const db = require('../db/db');
const bcrypt = require('bcrypt');

const reg_bank = async (req, res) => {
    try {
        const { bank_id, bank_name, hq_address } = req.body;
        await db('bank_details').insert({
            bank_id,
            bank_name,
            hq_address
        });
        res.status(201).send("Bank registered successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while registering the bank. Please try again." });
    }
}

const reg_branch = async (req, res) => {
    try {
        const { bank_id, branch_name, branch_address } = req.body;
        const bankExists = await db('bank_details')
            .select('bank_id')
            .where('bank_id', bank_id)
            .first();
        if (!bankExists) {
            return res.status(400).send({ message: `Bank with ID ${bank_id} does not exists.` });
        }
        await db('branch_details').insert({
            bank_id,
            branch_name,
            branch_address
        });
        res.status(201).send("Branch registered successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "An error occurred while registering the branch. Please try again." });
    }
};

const reg_person_and_roles = async (req, res) => {
    const {
        branch_id,
        name,
        DOB,
        phoneNo,
        address,
        role,
        password,
        DOJ,
        department,
        salary,
        email,
        membership_type,

    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Start a transaction
        await db.transaction(async (trx) => {
            // 1. Register the person and get the person_id
            const [person_id] = await trx('person').insert({
                branch_id,
                name,
                DOB,
                phoneNo,
                address,
                role,
                password: hashedPassword
            });

            // 2. Register the employee if the role is 'employee_only' or 'customer_employee'
            if (role === 'employee_only' || role === 'customer_employee') {
                await trx('employee').insert({
                    person_id, // Use the returned person_id
                    DOJ,
                    department,
                    salary,
                    email
                });
            }

            // 3. Register the customer if the role is 'customer_only' or 'customer_employee'
            if (role === 'customer_only' || role === 'customer_employee') {
                await trx('customer').insert({
                    person_id, // Use the returned person_id
                    membership_type
                });
            }

            // If everything goes well, commit the transaction
            res.status(200).send({
                message: 'Person and roles registered successfully!',
            });
        });
    } catch (error) {
        console.error("Error registering person and roles:", error);
        res.status(500).send({
            message: 'An error occurred while registering person and roles.',
        });
    }
};


module.exports = {
    reg_bank,
    reg_branch,
    reg_person_and_roles
}