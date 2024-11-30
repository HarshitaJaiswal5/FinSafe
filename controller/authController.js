const knex = require('knex');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { display_customer, display_employee } = require('./display');


const login = async (req, res) => {
    const { phoneNo, password } = req.body;

    try {
        const user = await db('person')
            .select('person_id', 'password', 'role','branch_id')
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
            const customerData = await display_customer(req,res,user.branch_id);  
            if (customerData.length > 0) {
                return res.status(200).send({
                    message: "Customer login successful!",
                    yourProfile: customerData,
                    token: token
                });
              }
        } 
        else if (user.role === 'employee_only') {
            const employeeData = await display_employee(req,res,user.branch_id);  
            if (employeeData.length > 0) {
              return res.status(200).send({
                message: "Employee login successful!",
                yourProfile: employeeData,  
                token: token
              });
            }
        }
         else {
            const employeeData = await display_employee(req,res,user.branch_id); 
            const customerData = await display_customer(req,res,user.branch_id);  
            if(employeeData.length>0 || customerData.length>0){
                return res.status(200).send({
                    message: "Login successful!",
                    yourEmpProfile: employeeData,
                    yourCustomerProfile: customerData,
                    token: token
                });
            } 
           
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
      res.json("invalid authoriztion");
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        console.error(error);
        res.status(404).json({ message: "invalid token" });
      }
      res.json({ message: "logout sucessfull" });
    });
  };
module.exports = { login , logout};

