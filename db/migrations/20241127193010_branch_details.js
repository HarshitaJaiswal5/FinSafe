exports.up = function(knex) {
    return knex.schema.createTable('branch_details', (table) => {
        table.increments('branch_id').primary(); 
        table
            .integer('bank_id')
            .unsigned()
            .notNullable()
            .references('bank_id') 
            .inTable('bank_details')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');
        table.string('branch_name', 255).notNullable(); 
        table.string('branch_address', 255).notNullable();
        table.timestamps(true, true); 
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('branch_details'); 
};
