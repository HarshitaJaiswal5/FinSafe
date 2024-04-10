/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Transaction_details_1',(table)=>{
       table.increments('id').primary()
       table.integer('Account_no')
       table.string('Account_holder_name')
       table.enum('transaction_done_by',["credit_card","debit_card","cash"])
       table.enum("Card_Type",["debit","credit"])
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
   return knex.schema.dropTable('Transaction_details_1')
 
};