exports.up = function(knex) {
    return knex.schema.createTable('transaction_details_2', t => {
        t.integer('transaction_id').primary().notNullable();
    
})}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transaction_details_2')
  
};
