const db = require('../db/db');

const validateFields_branch = async (body) => {
    const columns = await db('branch_details').columnInfo();
    const reqFields = Object.keys(columns);
    const recFields = Object.keys(body);

    const areValidFields = recFields.every((field) => {
        return reqFields.includes(field);
    })

    return areValidFields;
}

const validateFields_user = async (body) => {
    const reqFields = ["full_name","email","password"]
    const recFields = Object.keys(body);
    console.log(recFields); console.log(reqFields);
    const areValidFields = reqFields.every((field) => {
        return recFields.includes(field);
    })
    return areValidFields
};


const validateFields_trans = async (body) => {

    // const columns = await db('transaction_details').columnInfo();
    // const reqFields = Object.keys(columns);
    const reqFields  = ["account_no", "transaction_id", "amount", "transaction_type", "transaction_description"];
    const recFields = Object.keys(body);


    const areValidFields = reqFields.every((field) => {
        return recFields.includes(field)
    })
    return areValidFields;
};
const validateFields_notes = async (body) => {

    // const columns = await db('note_denominations').columnInfo();
    // const [reqFields] = Object.keys(columns);
    // 
    // const recFields = Object.keys(body);
    //

    const reqFields = ['account_no', 'notes_1000rs', 'notes_2000rs'];
    const recFields = Object.keys(body);
    console.log('reqFields'+ ' ' + reqFields);
    console.log('recFields'+ ' ' + recFields);


    const areValidFields = reqFields.every((field) => {
        return recFields.includes(field)
    })
    return areValidFields;
};

module.exports = {
    validateFields_branch,
    validateFields_user,
    validateFields_trans,
    validateFields_notes

}