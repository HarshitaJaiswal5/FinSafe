/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .alterTable('transaction_details', function(t){
        t.integer('current_balance').notNullable;})   
    .alterTable('note_denominations', function(t){
        t.dropColumn('transaction_type');
        t.dropColumn('amount');
        t.dropColumn('debit-credit');
        t.dropColumn('total_amount');

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
