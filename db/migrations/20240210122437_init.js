/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
   
    .alterTable('transaction_details', function(t){
        t.dropColumn('current_balance')})
    .createTable('current_balance', t => {
        t.integer('account_no').unsigned();
        t.foreign('account_no').references('account_no').inTable('account_holder_details');
        t.integer('current_balance').notNullable;
        t.timestamps(true,true)})
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('current_balance');
  };
  
