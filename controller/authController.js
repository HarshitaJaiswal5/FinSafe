const knex = require('knex');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { display_customer, display_employee } = require('./display');


// Helper function to get customer data for a branch
async function getCustomerData(branch_id) {
    const result = await db('person')
        .join('customer', 'person.person_id', 'customer.person_id')
        .select('person.*', 'customer.*')
        .where('person.branch_id', branch_id);

    // Remove password field if present
    return result.map(({ password, ...rest }) => rest);
}

// Helper function to get employee data for a branch
async function getEmployeeData(branch_id) {
    const result = await db('person')
        .join('employee', 'person.person_id', 'employee.person_id')
        .select('person.*', 'employee.*')
        .where('person.branch_id', branch_id);

    // Remove password field if present
    return result.map(({ password, ...rest }) => rest);
}

// Main login function
const login = async (req, res) => {
    const { phoneNo, password } = req.body;

    try {
        const user = await db('person')
            .select('person_id', 'password', 'role', 'branch_id')
            .where('phoneNo', phoneNo)
            .first();

        if (!user) {
            return res.status(404).send({
                message: `No person found with the phone number: ${phoneNo}`
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({
                message: "Incorrect password. Please try again."
            });
        }

        const token = generateToken(user);

        if (user.role === 'customer_only') {
            const customerData = await getCustomerData(user.branch_id);
            return res.status(200).send({
                message: "Customer login successful!",
                yourProfile: customerData,
                token: token
            });
        } else if (user.role === 'employee_only') {
            const employeeData = await getEmployeeData(user.branch_id);
            return res.status(200).send({
                message: "Employee login successful!",
                yourProfile: employeeData,
                token: token
            });
        } else {
            const employeeData = await getEmployeeData(user.branch_id);
            const customerData = await getCustomerData(user.branch_id);
            return res.status(200).send({
                message: "Login successful!",
                yourEmpProfile: employeeData,
                yourCustomerProfile: customerData,
                token: token
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({
            message: "An error occurred during login. Please try again later."
        });
    }
};

const logout = async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
       res.status(404).send({ message: "Token not found" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        console.error(error);
        res.status(404).send({ message: error });
      }
      res.status(200).send({ message: "logout sucessful" });
    });
};

module.exports = { login , logout};

