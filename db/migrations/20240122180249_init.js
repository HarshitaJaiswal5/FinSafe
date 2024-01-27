exports.up = function(knex) { 
    return knex.schema.createTable('branch_details', t => {
        t.integer('branch_id').primary();
        t.string('branch_name').notNullable();
        t.string('address').notNullable();
        t.timestamps(true,true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('branch_details');  
  
};
