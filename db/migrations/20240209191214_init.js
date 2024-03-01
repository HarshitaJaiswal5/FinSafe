/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .alterTable('note_denominations', function(t){
        t.integer('transaction_type').unsigned();
        t.foreign('transaction_type').references('transaction_type').inTable('transaction_details');
        t.integer('amount').unsigned();
        t.foreign('amount').references('amount').inTable('transaction_details');})  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
