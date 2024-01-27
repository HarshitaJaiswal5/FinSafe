exports.up = function (knex) {
    return knex.schema.alterTable('note_denominations', t => {
        t.dropColumn('2000_rs_notes');
        t.dropColumn('1000_rs_notes');
        t.dropColumn('200rs_notes');
        t.integer('1000rs_notes').nullable();

    })

};

exports.down = function (knex) {
    return knex.schema.alterTable('note_denominations', t => {
        t.dropColumn('2000rs_notes');
        t.dropColumn('1000rs_notes');

    })
}
