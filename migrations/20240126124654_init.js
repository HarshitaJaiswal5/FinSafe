
exports.up = function(knex) {
    return knex.schema.alterTable('note_denominations', t => {
        t.integer('notes_1000rs').nullable();
        t.integer('notes_2000rs').nullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
