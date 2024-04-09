/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
     return knex.schema.createTable('Transaction_details',(table)=>{
        table.increments('id').primary()
        table.integer('Account_no')
        table.enum("Transaction_type",["debit","credit"])
        table.integer('Amount')
        table.timestamp('created_at').defaultTo(knex.fn.now())
     })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Transaction_details')
  
};
