const knex = require('knex');
const db = require('../db/db');
const { format_to_ist } = require('../utils/format_to_ist');

const update_bank = async (req, res) => {
  try {
      const { bank_id } = req.params;
      const bank_exists = await db('bank_details')
          .select('bank_id')
          .where('bank_id', bank_id)
          .first();
      if (!bank_exists) {
          return res.status(404).send({ message: `No bank found with ID: ${bank_id}` });
      }
      await db('bank_details')
          .where('bank_id', bank_id)
          .update(req.body);
      const updated_details = await db('bank_details')
      .select('*')
      .where('bank_id', bank_id)
      .first();
      res.status(200).send({
          message: `Bank ID ${bank_id} details updated successfully!`,
          data: updated_details
      });
  } catch (error) {
      console.log("Error updating bank:", error);
      res.status(500).send({ message: "An error occurred while updating bank details." });
  }
};
const update_branch = async (req, res) => {
  try {
      const { branch_id } = req.params;
      const branch_exists = await db('branch_details')
          .select('branch_id')
          .where('branch_id', branch_id)
          .first();
      if (!branch_exists) {
          return res.status(404).send({ message: `No branch found with ID: ${branch_id}` });
      }
      await db('branch_details')
          .where('branch_id', branch_id)
          .update(req.body);
      const updated_details = await db('branch_details')
      .select('*')
      .where('branch_id', branch_id)
      .first();
      const result = format_to_ist(updated_details);
      res.status(200).send({
          message: `Branch ID ${branch_id} details updated successfully!`,
          data: result
      });
  } catch (error) {
      console.log("Error updating bank:", error);
      res.status(500).send({ message: "An error occurred while updating branch details." });
  }
};
const update_person_and_roles = async (req, res) => {
    const { person_id } = req.params;
    const { name, DOB, phoneNo, address, branch_id, role, DOJ, department, salary, membership_type } = req.body;

    try {
        // Start a transaction
        await db.transaction(async (trx) => {
            // Fetch the existing person to check if it exists and retrieve the current role if needed
            const personRecord = await trx('person').where({ person_id }).first();

            if (!personRecord) {
                throw new Error(`Person with ID ${person_id} not found.`);
            }

            // Use the existing role if not provided in the request body
            const finalRole = role || personRecord.role;

            // Ensure role consistency
            if (role && role !== personRecord.role) {
                throw new Error(`Role mismatch: Role cannot be updated for person with ID ${person_id}.`);
            }

            // Update the person table
            await trx('person')
                .where({ person_id })
                .update({
                    name,
                    DOB,
                    phoneNo,
                    address,
                    branch_id,
                    updated_at: trx.fn.now() // Updates the `updated_at` column
                });

            // Update the employee table if role is 'employee_only' or 'customer_employee'
            if (finalRole === 'employee_only' || finalRole === 'customer_employee') {
                const employeeExists = await trx('employee').where({ person_id }).first();

                if (employeeExists) {
                    // Update existing employee record
                    await trx('employee')
                        .where({ person_id })
                        .update({
                            DOJ,
                            department,
                            salary,
                            updated_at: trx.fn.now()
                        });
                } else {
                    // Insert a new employee record if missing
                    await trx('employee').insert({
                        person_id,
                        DOJ,
                        department,
                        salary
                    });
                }
            }

            // Update the customer table if role is 'customer_only' or 'customer_employee'
            if (finalRole === 'customer_only' || finalRole === 'customer_employee') {
                const customerExists = await trx('customer').where({ person_id }).first();

                if (customerExists) {
                    // Update existing customer record
                    await trx('customer')
                        .where({ person_id })
                        .update({
                            membership_type,
                            updated_at: trx.fn.now()
                        });
                } else {
                    // Insert a new customer record if missing
                    await trx('customer').insert({
                        person_id,
                        membership_type
                    });
                }
            }
        });

        res.status(200).send({ message: `Person with ID ${person_id} updated successfully.` });
    } catch (error) {
        console.error("Error updating person and roles:", error);
        if (error.message.includes("not found")) {
            res.status(404).send({ message: error.message });
        } else if (error.message.includes("Role mismatch")) {
            res.status(400).send({ message: error.message });
        } else {
            res.status(500).send({ message: "An error occurred while updating the person and roles." });
        }
    }
};





module.exports ={
    update_bank,
    update_branch,
    update_person_and_roles

}