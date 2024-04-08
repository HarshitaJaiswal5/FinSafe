/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
   
    
    .createTable ('current_balance_details_1', function(t){        
            t.integer('account_no'); // Define account_no as the primary key
            t.integer('current_balance')
           
        });
        
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('current_balance_details_1')
  
};
