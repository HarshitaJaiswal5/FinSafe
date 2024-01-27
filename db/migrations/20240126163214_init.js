
exports.up = function(knex) {
    return knex.schema.alterTable('transaction_details', t => {
        t.dropColumn('transaction_id');
        // t.integer('transaction_id').primary().notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
