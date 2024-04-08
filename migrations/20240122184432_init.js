
exports.up = function(knex) { 
    return knex.schema.createTable('account_holder_details_1', t => {
        t.increments('account_no').primary();
        t.string('full_name').notNullable();
        t.string('email').notNullable().unique();
        t.string('password').notNullable();
        t.timestamps(true,true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('account_holder_details_1');  
  
};
