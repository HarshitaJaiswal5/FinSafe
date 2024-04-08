/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
   
    .alterTable('current_balance', function(t){
        t.dropTableIfExists})
    .createTable ('current_balance_details', function(t){        
            t.integer('account_no').unsigned().primary(); // Define account_no as the primary key
            t.integer('current_balance').notNullable();
            t.timestamps(true, true);
            // Add foreign key constraint 
            t.foreign('account_no').references('account_no').inTable('account_holder_details');
        });

  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('current_balance_details', function(table) {
      table.integer('current_balance').defaultTo(0).alter();
    });
  };
  