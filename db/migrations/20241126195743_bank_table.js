exports.up = function(knex) {
    return knex.schema.createTable('bank_details', (table) => {
        table.increments('bank_id').unsigned().primary();
        table.string('bank_name', 255).notNullable().unique();
        table.string('hq_address', 255).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bank_details');
};
