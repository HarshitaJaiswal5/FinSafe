
exports.up = function(knex) { 
    return knex.schema.createTable('transaction_details', t => {
       
        t.integer('transition_id').notNullable();
        t.integer('amount').notNullable();
        t.string('transaction_description').nullable();
        t.timestamps(true,true);
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('transaction_details');  
  
};