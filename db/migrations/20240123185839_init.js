
exports.up = function(knex) {
    return knex.schema.alterTable('account_holder_details', t => {
        t.integer('branch_id').unsigned();
        t.foreign('branch_id').references('branch_id').inTable('branch_details');
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('account_holder_details', t => {
        t.dropForeign();
        t.dropColumn();
    } )
};
