const knex = require('knex');
const db = require('../db/db.js');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { generateRandomString,generateRandomString8, generateRandomCharacters } = require('../utils/generateRandomString.js')
const { validateFields_branch, validateFields_user, validateFields_trans, validateFields_notes } = require('../utils/validateFields');

const registerUser = async (req, res) => {

    try {
        const { Fullname, Email, DOB, Permanent_Address } = req.body;
        const areValidFields = await validateFields_user(req.body);
        console.log(areValidFields);
        if (!areValidFields) {
            res.status(400).send(" Only valid fields to add: 'Fullname','Email','DOB','Permanent_Address' ")
        } else {
            const hashedPassword = await argon2.hash(DOB, { type: argon2.argon2id });
            await db('Users_1').insert({
                Fullname,
                Email,
                DOB:hashedPassword,
                Permanent_Address
            });
            res.status(201).send("User registered successfully!");
        }
    } catch (error) {
        console.log(error);
    }
}
const branch = async (req, res) => {
    try {
        const { Branch_name,Branch_Adress } = req.body;
        // const result = await validateFields_branch(req.body);
        // console.log('result' + result);

        let branchCode = generateRandomString()
        console.log(branchCode)

        await db('Branch').insert({
         Branch_name,
         Branch_code: branchCode,
         Branch_Adress
    });
        res.status(201).send("Branch registered successfully!");

        
    }


    catch (error) {
        console.log(error);
    }
}
    
const registerAccountHolder = async(req,res) =>{
    try{
    const{ Fullname,Permanent_Address,Aadhar_Number,Branch_Name,Email } = req.body
    

    const accountNumber = generateRandomString8()
    const password = generateRandomCharacters(8)
    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    console.log(password);

    let insertion = await db('Register-Account-Holder_2').insert({
        Fullname,
        Permanent_Address,
        Aadhar_Number,
        Branch_Name,
        Account_Number:accountNumber,
        Net_Banking_Password:hashedPassword
    })
    if (insertion){
        res.json("Account holder created successfully")
    } else(error) =>{
        console.log(error)
        res.json("Some error occurred while creating account holder")
    }



async function sendMail(){
    const transporter  =nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eklavyasinghparihar7875@gmail.com',
            pass: 'qnsqoemikkgsyutn'
        }
    })
    
    async function sendMail(){
        const transporter  =nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'eklavyasinghparihar7875@gmail.com',
                pass: 'qnsqoemikkgsyutn'
            }
        })
        
    const mailOptions ={
            from:'eklavyasinghparihar7875@gmail.com',
            to: Email,
            subject: 'Thanks For Registering With FinSafe',
            text: `Hello ${Fullname} thank you for registering with FinSafe.Here's your Account Number ${accountNumber} along with auto-generated password ${password}.`
        }
        
        try {
            const result = await transporter.sendMail(mailOptions)
            console.log('email sent successfully');
        } catch (error) {
            console.log('error',error)   
        }}
        sendMail()
if(sendMail){
    res.json("Confirmation has been sent to your registered email")
}
    }
} catch(error){
    console.error(error)
}    
}









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
    registerAccountHolder,
    transaction,
    denoms
};