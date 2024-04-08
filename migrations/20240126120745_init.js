exports.up = function (knex) {
    return knex.schema.createTable('note_denominations_2', t => {
        t.integer('2000_rs_notes');
        t.integer('1000_rs_notes');
        t.integer('200rs_notes');
        t.integer('1000rs_notes').nullable();

    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('note_denominations_2')
        
}
