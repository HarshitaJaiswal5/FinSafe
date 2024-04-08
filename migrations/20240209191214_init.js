/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('note_denominations_4', function(t){
        t.integer('transaction_type').unsigned();
        t.string('transaction_type_1')
        t.integer('amount').unsigned();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('note_denominations_4')
  
};
