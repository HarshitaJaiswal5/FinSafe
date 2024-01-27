exports.up = function(knex) {
    return knex.schema.alterTable('note_denominations', t => {
        t.dropColumn('200rs notes');
    })
  
};

exports.down = function(knex) {
  
};
