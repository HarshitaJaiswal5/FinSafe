/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Check if record with id 1 already exists
  const existingRecord = await knex('Account_Balance').where({ id: 1 }).first();

  // If record doesn't exist, insert seed data
  if (!existingRecord) {
    await knex('Account_Balance').insert([
      {
        id: 1,
        Account_Number: 1234567,
        Total_Balance: 50000
      }
    ]);
  }
};
