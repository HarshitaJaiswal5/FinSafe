const knex = require('knex');
const db = require('../db/db');
const { format_to_ist } = require('../utils/format_to_ist');


const display_all_bank = async (req, res) => {
    try {
        const banks = await db.select('*').from('bank_details');
        const res_ist = await format_to_ist(banks);
        res.status(200).send(res_ist);
    } catch (error) {
        console.error('Error in display_all_bank:', error); 
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
}


const display_bank_details = async (req, res) => {
    try {
        const { bank_id } = req.params;
        if (!bank_id) {
            return res.status(400).send({ message: "Bank ID is required" });
        }
        const bank_details = await db('bank_details')
            .select('*')
            .where('bank_id', bank_id)
            .first();
        if (!bank_details) {
            return res.status(404).send({ message: `No bank found with ID: ${bank_id}` });
        } else {
            const result_ist = await format_to_ist(bank_details);
            res.status(200).send({ message: "Bank details fetched successfully", data: result_ist });
        }
    } catch (error) {
        console.error("Error fetching bank details:", error);
        res.status(500).send({ message: "An error occurred while fetching bank details" });
    }
};

const display_all_branches = async (req, res) => {
    try {
        const branches = await db.select('*').from('branch_details');
        const res_ist = await format_to_ist(branches);
        res.status(200).send(res_ist);
    } catch (error) {
        console.log(res);
    }
}

const display_branch_details = async (req, res) => {
    try {
        const { branch_id } = req.params;
        if (!branch_id) {
            return res.status(400).send({ message: "Bank ID is required" });
        }
        const branch_details = await db('branch_details')
            .select('*')
            .where('branch_id', branch_id)
            .first();
        if (!branch_details) {
            return res.status(404).send({ message: `No bank found with ID: ${branch_id}` });
        } else {
            const res_ist = await format_to_ist(branch_details);
            res.status(200).send({ message: "Bank details fetched successfully", data: res_ist });
        }
    } catch (error) {
        console.error("Error fetching bank details:", error);
        res.status(500).send({ message: "An error occurred while fetching bank details" });
    }
};

const fetchBankBranches = async (req, res) => {
    try {
        const { bank_id } = req.params;
        // First query: Fetch branch details
        const branches = await db('branch_details')
            .select('branch_id', 'bank_id', 'branch_name', 'branch_address')
            .where('bank_id', bank_id);
        // Second query: Fetch total branch count
        const [totalBranches] = await db('branch_details')
            .where('bank_id', bank_id)
            .count('bank_id as totalBranches');
        if (branches.length > 0) {
            const res_ist = await format_to_ist(branches);
            res.status(200).send({
                message: `All branches of Bank id ${bank_id} are displayed below`,
                data: res_ist,
                totalBranches: totalBranches.totalBranches
            });
        } else {
            res.status(404).send({ message: `No branches exist for Bank id ${bank_id}` });
        }
    } catch (error) {
        console.error("Error fetching bank details:", error);
        res.status(500).send({ message: "An error occurred while fetching bank details" });
    }
};

const display_customer = async (req, res) => {
    try {
        let { branch_id } = req.params;
        const active_branch_id = branch_id;
        if (!branch_id) {
            return res.status(400).send({
                message: "Branch ID is required"
            });
        }
        const result = await db('person')
            .join('customer', 'person.person_id', 'customer.person_id')
            .select('*')
            .where('person.branch_id', branch_id);
        const sanitizedResult = result.map(({ password, ...rest }) => rest);
        const res_ist = format_to_ist(sanitizedResult);
        if (res_ist.length > 0) {
            return res.status(200).send({
                message: `The employees of branch ID: ${active_branch_id} fetched successfully!`,
                data: res_ist,
            });
        } else {
            return res.status(200).send({
                message: `No employee in the branch ID:${active_branch_id} `
            });
        }
    } catch (error) {
        console.log("Error fetching bank details:", error);
        res.status(500).send({
            message: "An error occurred while fetching customer details"
        });
    }
};

const display_employee = async (req, res) => {
    try {
    const { branch_id } = req.params;

    if (!branch_id || (typeof branch_id !== 'string' && typeof branch_id !== 'number')) {
      return res.status(400).json({ message: "Branch ID is required and must be a string or number" });
    }

    const result = await db('person')
      .join('employee', 'person.person_id', 'employee.person_id')
      .select('person.*', 'employee.*')
      .where('person.branch_id', branch_id);

    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    const formattedResult = format_to_ist(sanitizedResult);

    if (formattedResult.length > 0) {
      return res.status(200).json({
        message: `Employees of branch ID: ${branch_id} fetched successfully!`,
        data: formattedResult,
      });
    } else {
      return res.status(200).json({
        message: `No employees found for branch ID: ${branch_id}`,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return res.status(500).json({
      message: "An error occurred while fetching employee details",
    });
  
}
};


module.exports = {
    display_all_bank,
    display_bank_details,
    display_all_branches,
    display_branch_details,
    fetchBankBranches,
    display_customer,
    display_employee
};
