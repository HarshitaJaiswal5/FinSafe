exports.up = function(knex) {
    return knex.schema.alterTable('note_denominations', t => {
        t.dropColumn('500rs notes');
    })
  
};

exports.down = function(knex) {
  
};
