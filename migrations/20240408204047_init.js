/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Register-Account-Holder_2',(table)=>{
        table.increments('id').primary()
        table.string('Fullname').notNullable()
        table.string('Permanent_Address').notNullable()
        table.integer('Aadhar_Number').notNullable()
        table.string('Branch_Name').notNullable()
        table.string('Account_Number').notNullable()  // Auto generated
        table.string('Net_Banking_Password').notNullable() // Auto generated

    })
  
};
                      
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Register-Account-Holder_2')
  
};
